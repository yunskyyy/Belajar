import { type ChangeEvent, useRef, useState } from 'react';

import { read, utils } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import PAYROLL_MIMETYPE from '@/views/Payroll/constants/mimeType';

import type { OvertimeSheetData } from '../../Overtime.types';

import overtimeSheetDataNormalizer from './normalizers/overtimeSheetDataNormalizer';
import overtimeSummaryNormalizer from './normalizers/overtimeSummaryNormalizer';
import type { OvertimeImportSummary } from './OvertimeImportModal.types';

const useOvertimeImportModal = () => {
  const toaster = useToaster();

  const { OVERTIME_EXPENSES: { OVERTIME_BULK } } = ENDPOINT;

  const uploadRef = useRef<HTMLInputElement>(null);
  const [isErrorMimeType, setIsErrorMimeType] = useState(false);
  const [importedFile, setImportedFile] = useState<File>();
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<OvertimeImportSummary>();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  const {
    mutate: mutateImport,
    isLoading: isImporting,
  } = usePostData<OvertimeImportSummary>(
    ['overtimeImport'],
    OVERTIME_BULK,
    {
      options: {
        onSuccess: (data) => {
          setShowSummary(true);
          setSummaryData(overtimeSummaryNormalizer(data));
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleImport = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && PAYROLL_MIMETYPE.includes(file.type)) {
      setImportedFile(file);
      setIsErrorMimeType(false);
    }
  };

  const handleSubmitUpload = async () => {
    if (importedFile) {
      const fileArrayBuffer = await importedFile.arrayBuffer();
      const workbook = read(fileArrayBuffer);
      const wsname = workbook.SheetNames[0];
      const data: OvertimeSheetData[] = utils.sheet_to_json(workbook.Sheets[wsname]);
      const foundStringInMonth = data.find((el) => typeof el.Month === 'string');
      if (foundStringInMonth) {
        toaster.error('Please use month sequence number instead of month name for Month column');
        return;
      }
      mutateImport(overtimeSheetDataNormalizer(data));
    }
  };

  const handleDrop = (files: File[]) => {
    setImportedFile(undefined);
    const file = files[0];
    if (file && PAYROLL_MIMETYPE.includes(file.type)) {
      setIsErrorMimeType(false);
      setImportedFile(file);
      return;
    }
    setIsErrorMimeType(true);
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  };

  return {
    isErrorMimeType,
    importedFile,
    isImporting,
    showSummary,
    summaryData,
    tabValue,
    uploadRef,
    handleChangeTab,
    handleDrop,
    handleImport,
    handleSubmitUpload,
    handleUploadChange,
  };
};

export default useOvertimeImportModal;
