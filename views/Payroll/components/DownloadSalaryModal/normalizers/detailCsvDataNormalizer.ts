import { formatAddress } from '../DownloadSalaryModal.helpers';
import type { CsvData, DetailCsvData } from '../DownloadSalaryModal.types';

const detailCsvDataNormalizer = (data: CsvData): CsvData => {
  const {
    contentDetail, contentHeaderMaker,
    debitAccountNo, totalAmount,
    totalDetailRecord, transactionDate,
  } = data || {};

  const listData = (contentDetail || []).map(
    (el): DetailCsvData => ({
      beneficiaryAccountNo: el.beneficiaryAccountNo || '',
      beneficiaryAccountName: el.beneficiaryAccountName || '',
      beneficiaryAddress1: el.beneficiaryAddress1 ? formatAddress(el.beneficiaryAddress1) : '',
      beneficiaryAddress2: el.beneficiaryAddress2 ? formatAddress(el.beneficiaryAddress2) : '',
      beneficiaryAddress3: el.beneficiaryAddress3 ? formatAddress(el.beneficiaryAddress3) : '',
      transferAmountCurrency: el.transferAmountCurrency || '',
      transferAmount: el.transferAmount || 0,
      transferRemark: el.transferRemark || '',
      customerReferenceNumber: el.customerReferenceNumber || '',
      ftService: el.ftService || '',
      beneficiaryBankCode: el.beneficiaryBankCode || '',
      beneficiaryBankName: el.beneficiaryBankName || '',
      beneficiaryBankAddress1: el.beneficiaryBankAddress1 ? formatAddress(el.beneficiaryBankAddress1) : '',
      beneficiaryBankAddress2: el.beneficiaryBankAddress2 ? formatAddress(el.beneficiaryBankAddress2) : '',
      beneficiaryBankAddress3: el.beneficiaryBankAddress3 ? formatAddress(el.beneficiaryBankAddress3) : '',
      beneficiaryBankCity: el.beneficiaryBankCity || '',
      beneficiaryNotifFlag: el.beneficiaryNotifFlag || '',
      beneficiaryNotifEmailAddress: el.beneficiaryNotifEmailAddress || '',
      organizationDirectoryName: el.organizationDirectoryName || '',
      identicalStatus: el.identicalStatus || '',
      beneficiaryStatus: el.beneficiaryStatus || '',
      beneficiaryCitizenship: el.beneficiaryCitizenship || '',
      purposeTransaction: el.purposeTransaction || '',
      transactionDesc: el.transactionDesc || '',
      remittanceCode1: el.remittanceCode1 || '',
      remittanceInfo1: el.remittanceInfo1 || '',
      remittanceCode2: el.remittanceCode2 || '',
      remittanceInfo2: el.remittanceInfo2 || '',
      remittanceCode3: el.remittanceCode3 || '',
      remittanceInfo3: el.remittanceInfo3 || '',
      remittanceCode4: el.remittanceCode4 || '',
      remittanceInfo4: el.remittanceInfo4 || '',
      instructionCode1: el.instructionCode1 || '',
      instructionRemark1: el.instructionRemark1 || '',
      instructionCode2: el.instructionCode2 || '',
      instructionRemark2: el.instructionRemark2 || '',
      instructionCode3: el.instructionCode3 || '',
      instructionRemark3: el.instructionRemark3 || '',
      changeInstruction: el.changeInstruction || '',
      correspondentBank: el.correspondentBank || '',
      swiftMethod: el.swiftMethod || '',
      extendedPaymentDetail: el.extendedPaymentDetail || '',
      treasuryConfirmation: el.treasuryConfirmation || '',
      underlyingDocCode: el.underlyingDocCode || '',
    }),
  );

  return {
    contentDetail: listData,
    contentHeaderMaker,
    debitAccountNo,
    totalAmount,
    totalDetailRecord,
    transactionDate,
  };
};

export default detailCsvDataNormalizer;
