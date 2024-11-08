import type { ChangeEvent } from 'react';

import Button from '@/components/base/Button';
import Radio from '@/components/base/Radio';
import Modal from '@/components/ui/Modal';

import {
  DOWNLOAD_OPTION,
} from './DownloadSalaryModal.constants';
import useDownloadSalaryModal from './DownloadSalaryModal.hooks';
import type { DownloadSalaryModalProps } from './DownloadSalaryModal.types';

const DownloadSalaryModal = (props: DownloadSalaryModalProps) => {
  const { open = false, onClose } = props;
  const {
    downloadType,
    isDownloading,
    handleChangeOption,
    handleDownload,
  } = useDownloadSalaryModal(props);

  return (
    <Modal open={open} title="Download Salary Detail" onClose={onClose} width={468}>
      <Modal.Content>
        <Radio
          options={DOWNLOAD_OPTION}
          label="Please choose your download format"
          classes={{ container: 'flex items-center h-16' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeOption(e.target.value)}
          checkedValue={String(downloadType)}
        />
      </Modal.Content>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            color="primary"
            variant="outline"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            color="primary"
            type="submit"
            loading={isDownloading}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadSalaryModal;
