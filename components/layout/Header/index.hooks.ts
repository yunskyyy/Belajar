import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLayoutContext } from '@/contexts/LayoutContext';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

const useHeader = () => {
  const router = useRouter();
  const toaster = useToaster();
  const {
    isCollapsed,
    toggleCollapsed,
  } = useLayoutContext();
  const { profile, getProfile } = useAuthContext();
  const { organizations = [], selectedOrganization, userId = '' } = profile || {};

  const [openOrgSwitcher, setOpenOrgSwitcher] = useState(false);

  const handleLogout = () => {
    router.push('/logout');
  };

  const handleCloseOrgSwitcher = () => {
    setOpenOrgSwitcher(false);
  };

  const handleOpenSwitcher = () => {
    setOpenOrgSwitcher(true);
  };

  const handleSuccessOrgSwitch = () => {
    window.location.reload();
    setOpenOrgSwitcher(false);
  };

  const {
    mutate: mutateSwitch,
  } = usePostData(
    ['organizationSwitch'],
    ENDPOINT.IDENTITY.SWITCH_ORG,
    {
      options: {
        onSuccess: () => {
          getProfile();
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

  useEffect(() => {
    if (!selectedOrganization && organizations.length > 1) {
      const defaultOrg = localStorage.getItem('defaultOrg');
      if (defaultOrg && JSON.parse(defaultOrg).userId === userId) {
        const { orgId } = JSON.parse(defaultOrg);
        mutateSwitch({ organizationId: orgId });
      } else {
        setOpenOrgSwitcher(true);
      }
    }
    if (!selectedOrganization && organizations.length === 1) {
      mutateSwitch({ organizationId: organizations[0].organizationId });
    }
  }, [mutateSwitch, organizations, selectedOrganization, userId]);

  return {
    isCollapsed,
    openOrgSwitcher,
    profile,
    handleCloseOrgSwitcher,
    toggleCollapsed,
    handleLogout,
    handleOpenSwitcher,
    handleSuccessOrgSwitch,
  };
};

export default useHeader;
