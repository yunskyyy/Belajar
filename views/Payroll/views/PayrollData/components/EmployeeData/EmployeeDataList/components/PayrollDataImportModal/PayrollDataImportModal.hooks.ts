import { type ChangeEvent, useRef, useState } from 'react';

import { read, utils } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { formatDateApi } from '@/utils';

import type { PayrollBulkRequest, PayrollSheetData } from '../../EmployeeData.types';

import payrollSummaryNormalizer from './normalizers/payrollSummaryNormalizer';
import { PAYROLL_DATA_MIME_TYPE } from './PayrollDataImportModal.constants';
import type {
  PayrollImportModalProps,
  PayrollImportSummary,
  PayrollSheetKeys,
} from './PayrollDataImportModal.types';

const usePayrollDataImportModal = (props: PayrollImportModalProps) => {
  const { isExact } = props;
  const toaster = useToaster();
  const { PAYROLLS: { IMPORT, IMPORT_EXACT } } = ENDPOINT;

  const [isErrorMimeType, setIsErrorMimeType] = useState(false);
  const [importedFile, setImportedFile] = useState<File>();
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<PayrollImportSummary>();
  const [tabValue, setTabValue] = useState(0);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  const handleDrop = (files: File[]) => {
    setImportedFile(undefined);
    const file = files[0];
    if (file && PAYROLL_DATA_MIME_TYPE.includes(file.type)) {
      setIsErrorMimeType(false);
      setImportedFile(file);
      return;
    }
    setIsErrorMimeType(true);
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  };

  const handleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && PAYROLL_DATA_MIME_TYPE.includes(file.type)) {
      setImportedFile(file);
      setIsErrorMimeType(false);
    }
  };

  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const {
    mutate: mutateImport,
    isLoading: isImporting,
  } = usePostData<PayrollImportSummary>(
    ['overtimeImport'],
    isExact ? IMPORT_EXACT : IMPORT,
    {
      options: {
        onSuccess: (data) => {
          setShowSummary(true);
          setSummaryData(payrollSummaryNormalizer(data));
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

  const handleSubmitUpload = async () => {
    if (importedFile) {
      const fileArrayBuffer = await importedFile.arrayBuffer();
      const workbook = read(fileArrayBuffer, { cellDates: true });
      const wsname = workbook.SheetNames[0];
      const jsonData: PayrollSheetData[] = utils.sheet_to_json(workbook.Sheets[wsname]);
      const jsonHeaderData = jsonData[0];
      const employeeInfoFields: PayrollSheetKeys = [
        'Employee ID',
        'Employee Name',
        'Type',
        'Effective Date',
      ]; // static columns

      jsonData.shift(); // remove headers row

      const processedData = jsonData.map((data: PayrollSheetData) => {
        // get dynamic column keys
        const componentKeys = Object.keys(data).filter(
          (key) => !employeeInfoFields.includes(key),
        );

        const handleEffectiveDate = (value: PayrollSheetData) => {
          if (value['Effective Date'] as unknown instanceof Date) {
            return formatDateApi(new Date(value['Effective Date']));
          }
          const dateParts = value['Effective Date'].split('/');
          const dateObject = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
          return formatDateApi(dateObject);
        };

        // create new object of array from each of component name keys
        return componentKeys.length ? componentKeys.map((key): PayrollBulkRequest => ({
          employeeCode: data['Employee ID'] || '',
          employeeName: data['Employee Name'] || '',
          type: data.Type?.trim() || '',
          effectiveDate: data['Effective Date'] ? handleEffectiveDate(data) : '',
          amount: 0,
          newAmount: Number(data[key]) || 0,
          componentId: jsonHeaderData[key] || '',
          componentTypeId: key.slice(0, key.includes('_')
            ? key.indexOf('_')
            : key.length), // get component type name based on parent column
        })) : ({
          employeeCode: data['Employee ID'] || '',
          employeeName: data['Employee Name'] || '',
          type: data.Type?.trim() || '',
          effectiveDate: data['Effective Date'] ? handleEffectiveDate(data) : '',
          amount: 0,
          newAmount: 0,
          componentId: '',
          componentTypeId: '',
        });
      }).flat(); // flatten [[rows data], [rows data]] into [...rows data, ...rows data]

      mutateImport(processedData);
    }
  };

  return {
    importedFile,
    isErrorMimeType,
    isImporting,
    showSummary,
    summaryData,
    tabValue,
    uploadRef,
    handleChangeTab,
    handleDrop,
    handleSubmitUpload,
    handleUpload,
    handleUploadChange,
  };
};

export default usePayrollDataImportModal;
