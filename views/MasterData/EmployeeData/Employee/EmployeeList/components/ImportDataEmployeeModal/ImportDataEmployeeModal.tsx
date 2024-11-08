import Image from 'next/image';

import uploadIcon from '@/assets/upload.svg';
import Button from '@/components/base/Button';
import Typography from '@/components/base/Typography';
import { IcAlert, IcNote } from '@/components/icons';
import Droppable from '@/components/ui/Droppable';
import Modal from '@/components/ui/Modal';
import { noop } from '@/utils';

import EMPLOYEE_DATA_MIME_TYPE from './ImportDataEmployeeModal.constant';
import useEmployeeDataImportModal from './ImportDataEmployeeModal.hooks';
import type { EmployeeDataImportModalProps } from './ImportDataEmployeeModal.types';

const PayrollDataImportModal = (props: EmployeeDataImportModalProps) => {
  const {
    open = false,
    onClose = noop,
  } = props;

  const {
    importedFile,
    isErrorMimeType,
    uploadRef,
    handleDrop,
    handleSubmitUpload,
    handleUpload,
    handleUploadChange,
  } = useEmployeeDataImportModal();

  return (
    <Modal
      open={open}
      title="Import Employee Data"
      width={960}
      onClose={onClose}
    >
      <Modal.Content>
        <Droppable className="w-full" onDrop={handleDrop}>
          <div
            className="h-96 border-2 border-dashed border-n-7
                rounded-xl flex flex-col justify-center items-center gap-2.5"
          >
            <Image src={uploadIcon} alt="" width={54} height={82} />
            <Typography variant="title">Upload File to Import Employee Data</Typography>
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
              accept={EMPLOYEE_DATA_MIME_TYPE.join(', ')}
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
          >
            Upload Data
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PayrollDataImportModal;
