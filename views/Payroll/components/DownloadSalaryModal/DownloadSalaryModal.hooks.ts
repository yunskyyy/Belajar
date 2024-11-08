import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { type BookType, utils, writeFile } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';

import detailCsvDataNormalizer from './normalizers/detailCsvDataNormalizer';
import { DOWNLOAD_OPTION } from './DownloadSalaryModal.constants';
import type { CsvData, DownloadSalaryModalProps } from './DownloadSalaryModal.types';

const useDownloadSalaryModal = (props: DownloadSalaryModalProps) => {
  const { payrollDisbursementId } = props;
  const pathname = usePathname();
  const [downloadType, setDownloadType] = useState(String(DOWNLOAD_OPTION[0].value));
  const isPayroll = useMemo(() => pathname.includes('run-payroll'), [pathname]);

  const { DISBURSEMENT_MGMT, RUN_THR_MGMT } = ENDPOINT;
  const { CSV_DATA } = DISBURSEMENT_MGMT;
  const { CSV_RUN_THR } = RUN_THR_MGMT;

  const handleChangeOption = (value: string) => {
    setDownloadType(value);
  };

  const {
    refetch: refetchDownload,
    isFetching: isDownloading,
  } = useGetData<CsvData>(
    ['csvData'],
    isPayroll ? CSV_DATA(payrollDisbursementId) : CSV_RUN_THR(payrollDisbursementId),
    {
      normalizer: detailCsvDataNormalizer,
      options: {
        enabled: false,
      },
    },
  );

  const createFile = (data: CsvData) => {
    const header = [
      data.contentHeaderMaker,
      data.transactionDate,
      data.debitAccountNo,
      data.totalDetailRecord,
      data.totalAmount,
    ];

    const worksheet = utils.aoa_to_sheet([[]]);
    utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    utils.sheet_add_json(worksheet, data.contentDetail, { origin: 'A2', skipHeader: true });
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, isPayroll ? 'Salary Detail' : 'THR Detail');
    writeFile(
      workbook,
      `${isPayroll ? `Salary Detail_${data.transactionDate || ''}`
        : `THR Detail_${data.transactionDate || ''}`}.${downloadType}`,
      { compression: true, bookType: downloadType as BookType },
    );
  };

  const handleDownload = () => {
    refetchDownload().then((value) => {
      if (value && value.data) {
        createFile(value.data);
      }
    });
  };

  return {
    downloadType,
    isDownloading,
    handleChangeOption,
    handleDownload,
  };
};

export default useDownloadSalaryModal;
