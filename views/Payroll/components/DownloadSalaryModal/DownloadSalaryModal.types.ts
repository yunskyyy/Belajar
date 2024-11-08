export interface DownloadSalaryModalProps {
  payrollDisbursementId: string,
  open?: boolean;
  onClose?: () => void;
}

export interface CsvData {
  contentHeaderMaker: string;
  transactionDate: string;
  debitAccountNo: string;
  totalDetailRecord: number;
  totalAmount: number;
  contentDetail: DetailCsvData[]
}

export interface DetailCsvData {
  beneficiaryAccountName: string;
  beneficiaryAccountNo: string;
  beneficiaryAddress1: string;
  beneficiaryAddress2: string;
  beneficiaryAddress3: string;
  beneficiaryBankAddress1: string;
  beneficiaryBankAddress2: string;
  beneficiaryBankAddress3: string;
  beneficiaryBankCity: string;
  beneficiaryBankCode: string;
  beneficiaryBankName: string;
  beneficiaryCitizenship: string;
  beneficiaryNotifEmailAddress: string;
  beneficiaryNotifFlag: string;
  beneficiaryStatus: string;
  changeInstruction: string;
  correspondentBank: string;
  customerReferenceNumber: string;
  extendedPaymentDetail: string;
  ftService: string;
  identicalStatus: string;
  instructionCode1: string;
  instructionCode2: string;
  instructionCode3: string;
  instructionRemark1: string;
  instructionRemark2: string;
  instructionRemark3: string;
  organizationDirectoryName: string;
  purposeTransaction: string;
  remittanceCode1: string;
  remittanceCode2: string;
  remittanceCode3: string;
  remittanceCode4: string;
  remittanceInfo1: string;
  remittanceInfo2: string;
  remittanceInfo3: string;
  remittanceInfo4: string;
  swiftMethod: string;
  transactionDesc: string;
  transferAmount: number;
  transferAmountCurrency: string;
  transferRemark: string;
  treasuryConfirmation: string;
  underlyingDocCode: string;
}
