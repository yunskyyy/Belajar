'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

import Paper from '@/components/base/Paper';
import Tabs from '@/components/base/Tabs';
import PageHeader from '@/components/ui/PageHeader';

const OnsiteIncentive = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() || '';
  const activePath = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [tabHrefs] = useState<string[]>(['amount-setting', 'list']);
  const tabValue = useMemo(() => {
    const tabIndex = tabHrefs.findIndex((el) => el === activePath);
    return tabIndex > -1 ? tabIndex : undefined;
  }, [activePath, tabHrefs]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="List Onsite & Incentive"
        crumbs={[
          { label: 'Payroll' },
          { label: 'Additional Earning' },
          { label: 'Onsite & Incentive' },
        ]}
      />
      <Paper className="p-4">
        <Tabs
          labels={['Amount Setting', 'Onsite & Incentive']}
          hrefs={tabHrefs}
          value={tabValue}
        />
        {children}
      </Paper>
    </div>
  );
};

export default OnsiteIncentive;
