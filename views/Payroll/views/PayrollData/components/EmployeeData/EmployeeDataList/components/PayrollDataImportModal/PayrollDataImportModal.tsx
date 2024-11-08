import Image from 'next/image';

import uploadIcon from '@/assets/upload.svg';
import Button from '@/components/base/Button';
import Tabs from '@/components/base/Tabs';
import Ticker from '@/components/base/Ticker';
import Typography from '@/components/base/Typography';
import { IcAlert, IcNote } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Droppable from '@/components/ui/Droppable';
import Modal from '@/components/ui/Modal';
import { noop } from '@/utils';

import { PAYROLL_DATA_MIME_TYPE, TABLE_COLUMN } from './PayrollDataImportModal.constants';
import usePayrollDataImportModal from './PayrollDataImportModal.hooks';
import type { PayrollImportModalProps } from './PayrollDataImportModal.types';

const PayrollDataImportModal = (props: PayrollImportModalProps) => {
  const {
    isExact = false,
    open = false,
    onClose = noop,
  } = props;

  const {
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
  } = usePayrollDataImportModal(props);

  return (
    <Modal
      open={open}
      title={`Import ${isExact ? 'Exact' : ''} Payroll Data`}
      width={960}
      onClose={onClose}
    >
      {!showSummary && (
        <>
          <Modal.Content>
            <Droppable className="w-full" onDrop={handleDrop}>
              <div
                className="h-96 border-2 border-dashed border-n-7
                rounded-xl flex flex-col justify-center items-center gap-2.5"
              >
                <Image src={uploadIcon} alt="" width={54} height={82} />
                <Typography variant="title">Upload File to Import Payroll Data</Typography>
                {!importedFile ? (
                  <Typography variant="body" align="center">
                    Drag and Drop a file (CVS, XLSX or XLS) anywhere or browser your file
                    <br />
                    or
                  </Typography>
                ) : (
                  <Typography className="flex items-center gap-2">
                    <IcNote />
                    {importedFile.name}
                  </Typography>
                )}
                <input
                  type="file"
                  accept={PAYROLL_DATA_MIME_TYPE.join(', ')}
                  hidden
                  ref={uploadRef}
                  onChange={handleUploadChange}
                />
                <Button color="primary" onClick={handleUpload}>
                  {!importedFile ? 'Choose a file to upload' : 'Change file'}
                </Button>
                {isErrorMimeType && (
                  <div className="flex gap-2 mt-12 items-center">
                    <div
                      className="h-4 w-4 bg-danger-500 rounded-full flex justify-center items-center"
                    >
                      <IcAlert width={12} height={12} className="fill-n-1" />
                    </div>
                    <Typography className="text-danger-500">
                      Sorry we could not read that file. Please upload a valid CSV, XLSX or XLS file
                    </Typography>
                  </div>
                )}
              </div>
            </Droppable>
          </Modal.Content>
          <Modal.Footer>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                onClick={handleSubmitUpload}
                loading={isImporting}
              >
                Upload Data
              </Button>
            </div>
          </Modal.Footer>
        </>
      )}
      {(showSummary && summaryData) && (
        <Modal.Content>
          <Tabs
            labels={['Success', 'Failed']}
            counters={[summaryData.dataSuccess.length, summaryData.dataFailed.length]}
            value={tabValue}
            onChange={handleChangeTab}
          >
            <Tabs.TabPanel index={0} value={tabValue}>
              <DataTable
                data={summaryData.dataSuccess}
                columns={TABLE_COLUMN}
                uniqueRowKey="id"
                showSearch={false}
                showAuditTrail={false}
                showPageSizeChanger={false}
                label={{
                  emptyState: {
                    title: 'Yah, sayang sekali data anda tidak tersedia',
                    message: 'Silahkan cek dan lebih teliti data anda jika terjadi kesalahan input',
                  },
                }}
              />
            </Tabs.TabPanel>
            <Tabs.TabPanel index={1} value={tabValue}>
              {!!summaryData.dataFailed.length && (
                <Ticker
                  className="mt-4"
                  text="The data you entered does not match the criteria, please correct the data below"
                  type="error"
                />
              )}
              <DataTable
                data={summaryData.dataFailed}
                columns={TABLE_COLUMN}
                uniqueRowKey="id"
                showSearch={false}
                showAuditTrail={false}
                showPageSizeChanger={false}
                label={{
                  emptyState: {
                    title: 'Tidak ada data yang tersedia saat ini',
                    message: 'Terimakasih atas ketelitian anda, saat ini tidak ada yang salah dengan datamu, ',
                  },
                }}
              />
            </Tabs.TabPanel>
          </Tabs>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default PayrollDataImportModal;
