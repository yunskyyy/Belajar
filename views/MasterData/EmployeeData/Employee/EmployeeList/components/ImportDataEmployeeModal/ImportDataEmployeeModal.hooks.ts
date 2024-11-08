import { type ChangeEvent, useRef, useState } from 'react';

import EMPLOYEE_DATA_MIME_TYPE from './ImportDataEmployeeModal.constant';

const useEmployeeDataImportModal = () => {
  const [isErrorMimeType, setIsErrorMimeType] = useState(false);
  const [importedFile, setImportedFile] = useState<File>();
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleDrop = (files: File[]) => {
    setImportedFile(undefined);
    const file = files[0];
    if (file && EMPLOYEE_DATA_MIME_TYPE.includes(file.type)) {
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
    if (file && EMPLOYEE_DATA_MIME_TYPE.includes(file.type)) {
      setImportedFile(file);
      setIsErrorMimeType(false);
    }
  };

  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleSubmitUpload = async () => {};

  return {
    importedFile,
    isErrorMimeType,
    uploadRef,
    handleDrop,
    handleSubmitUpload,
    handleUpload,
    handleUploadChange,
  };
};

export default useEmployeeDataImportModal;
