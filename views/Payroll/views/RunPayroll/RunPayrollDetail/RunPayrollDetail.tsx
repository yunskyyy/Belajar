'use client';

import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { camelCaseToTitleCase, toIDR } from '@/utils';
import Widget from '@/views/Payroll/components/EmployeeDataForm/components/Widget';

import useRunPayrollDetail from './RunPayrollDetail.hooks';

const RunPayrollDetail = ({ id }: { id:string }) => {
  const {
    widgetSummary,
    summaryLoading,
    tableColumns,
    listEmployee,
    employeeLoading,
    queryParams,
    handleBack,
    onPageSizeChange,
    onPageChange,
    onSearchChange,
    onSortChange,
  } = useRunPayrollDetail({ id });

  return (
    <>
      <Paper className="p-4 mb-5">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Detail Run Payroll"
            crumbs={[{ label: 'Disbursement' },
              { label: 'Run Payroll', href: '/payroll/disbursement/run-payroll' },
              { label: 'Detail Run Payroll' }]}
            showBackBtn
            onClickBackBtn={handleBack}
          />
        </div>
      </Paper>
      <Paper className="p-4 mb-5">
        <>
          <hr className="mt-8" />
          <div className="mt-3">
            <Typography variant="title" className="mb-6">List Employee</Typography>
            <div
              className="flex justify-items-stretch gap-3 flex-wrap [&>*]:flex-grow [&>*]:flex-shrink [&>*]:basis-0"
            >
              {(widgetSummary && !summaryLoading) ? (Object.entries(widgetSummary)
                .map((el) => (
                  <Widget
                    key={el[0]}
                    label={camelCaseToTitleCase(el[0] || '')}
                    value={toIDR(Number(el[1]))}
                  />
                ))) : (
                Array(7)
                  .fill(null)
                  .map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="bg-n-4 w-28 h-24 rounded-xl animate-pulse" key={i} />
                  ))
              )}
            </div>
            <form className="mt-3">
              <Paper className="flex flex-col gap-4 mb-6">
                <DataTable
                  columns={tableColumns}
                  loading={employeeLoading}
                  data={(listEmployee && listEmployee.items) || []}
                  onPageSizeChange={onPageSizeChange}
                  onPageChange={onPageChange}
                  onSearchChange={onSearchChange}
                  pageSize={queryParams.size}
                  page={queryParams.page}
                  showPagination
                  onSortChange={onSortChange}
                  searchPlaceholder="Search by Employee Name"
                  uniqueRowKey="employee"
                  showCountTotal
                  totalData={(listEmployee && listEmployee.totalData) || 0}
                  showAuditTrail={false}
                />
              </Paper>
            </form>
          </div>
        </>
      </Paper>
    </>
  );
};

export default RunPayrollDetail;
