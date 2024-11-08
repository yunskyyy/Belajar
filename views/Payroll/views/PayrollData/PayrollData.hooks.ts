import { useState } from 'react';

const usePayrollData = () => {
  const [tabValue, setTabValue] = useState(1);

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  return {
    tabValue,
    handleChangeTab,
  };
};

export default usePayrollData;
