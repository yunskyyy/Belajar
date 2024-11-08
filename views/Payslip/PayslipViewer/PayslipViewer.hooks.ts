import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';

import payslipDataNormalizer from './normalizers/payslipDataNormalizer';
import type { PayslipData, PayslipViewerProps } from './PayslipViewer.types';

const usePayslipViewer = (props: PayslipViewerProps) => {
  const { id: payslipId = '', employeeId } = props;

  const { PAYSLIP_MGMT: { PAYSLIP_DATA } } = ENDPOINT;

  const {
    data: payslipData,
    isLoading,
  } = useGetData<PayslipData>(
    ['payslipData', payslipId, employeeId],
    PAYSLIP_DATA(payslipId, employeeId),
    {
      normalizer: payslipDataNormalizer,
    },
  );

  return {
    isLoading,
    payslipData,
  };
};

export default usePayslipViewer;
