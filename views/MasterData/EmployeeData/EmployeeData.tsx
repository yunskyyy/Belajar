'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import Paper from '@/components/base/Paper';
import Tabs from '@/components/base/Tabs';
import PageHeader from '@/components/ui/PageHeader';

const EmployeeData = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname() || '';
  const activePath = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [tabHrefs] = useState<string[]>(['employee', 'resigned']);
  const tabValue = useMemo(() => {
    const tabIndex = tabHrefs.findIndex((el) => el === activePath);
    return tabIndex > -1 ? tabIndex : undefined;
  }, [activePath, tabHrefs]);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="List Master Data Employee"
        crumbs={[{ label: 'Master Data' }, { label: 'List Master Data Employee' }]}
      />
      <Paper className="p-4">
        <Tabs
          labels={['Employee Data', 'Resigned Data']}
          hrefs={tabHrefs}
          value={tabValue}
        />
        {children}
      </Paper>
    </div>
  );
};

export default EmployeeData;
