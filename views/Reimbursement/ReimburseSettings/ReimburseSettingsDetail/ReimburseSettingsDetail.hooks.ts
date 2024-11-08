import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';

import type { ReimburseSettingDetail } from '../types/reimburseSettings';

import reimburseSettingsDetailNormalizer
  from './normalizers/reimburseSettingsDetail.normalizer';
import type {
  ReimburseSettingsDetailProps,
} from './ReimburseSettingsDetail.type';

const useReimburseSettingsDetail = (props: ReimburseSettingsDetailProps) => {
  const router = useRouter();
  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_SETTINGS } = REIMBURSEMENT;
  const { BY_ID } = REIMBURSE_SETTINGS;

  const { id = '' } = props;
  const {
    data: settingData,
  } = useGetData<ReimburseSettingDetail, ReimburseSettingDetail>(
    ['reimburseSettingDetail'],
    BY_ID(id),
    {
      options: {
        enabled: !!id,
      },
      normalizer: reimburseSettingsDetailNormalizer,
    },
  );
  const handleBack = () => {
    router.push('/reimbursement/reimburse-settings');
  };

  return {
    settingData,
    handleBack,
  };
};

export default useReimburseSettingsDetail;
