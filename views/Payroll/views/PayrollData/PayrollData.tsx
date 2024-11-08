'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import Paper from '@/components/base/Paper';
import Tabs from '@/components/base/Tabs';
import PageHeader from '@/components/ui/PageHeader';

const PayrollData = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname() || '';
  const activePath = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [tabHrefs] = useState<string[]>(['mass-changes', 'employee']);
  const tabValue = useMemo(() => {
    const tabIndex = tabHrefs.findIndex((el) => el === activePath);
    return tabIndex > -1 ? tabIndex : undefined;
  }, [activePath, tabHrefs]);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="List Payroll Data"
        crumbs={[{ label: 'Payroll' }, { label: 'Payroll Data' }]}
      />
      <Paper className="p-4">
        <Tabs
          labels={['Mass Changes', 'Employee']}
          hrefs={tabHrefs}
          value={tabValue}
        />
        {children}
      </Paper>
    </div>
  );
};

export default PayrollData;
