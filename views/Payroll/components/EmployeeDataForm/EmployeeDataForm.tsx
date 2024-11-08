'use client';

import { format } from 'date-fns';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';
import { IcEdit } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Description from '@/components/ui/Description';
import { camelCaseToTitleCase, noop, toIDR } from '@/utils';
import type { RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';

import ModalSelectEmployee from '../ModalSelectEmployee';

import ModalEditComponent from './components/ModalEditComponent';
import ModalEditEmployee from './components/ModalEditEmployee';
import Widget from './components/Widget';
import useEmployeeDataForm from './EmployeeDataForm.hooks';

const EmployeeDataForm = (props: RunPayrollComponentProps) => {
  const {
    id = '',
    onNextStep = noop,
    onPrevStep = noop,
    isEdit = false,
  } = props;
  const {
    componentExisting,
    dataRunPayroll,
    dataRunPayrollLoading,
    employeeLoading,
    isPayroll,
    listEmployee,
    modalEmployeeId,
    openForm,
    openModalComponent,
    openModalEdit,
    queryParams,
    summaryLoading,
    tableColumns,
    widgetSummary,
    cutOffPeriod,
    handleCloseForm,
    handleCloseModalComponent,
    handleCloseModalEdit,
    handleOpenForm,
    handleOpenModalComponent,
    handleOpenModalEdit,
    invalidateQueries,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useEmployeeDataForm(props);

  const {
    description = '',
    paymentScheduleDate = '',
    periodDate = '',
    totalEmployees = 0,
  } = dataRunPayroll || {};

  const {
    startDt: cutOffPeriodStartDt = '',
    endDt: cutOffPeriodEndDt = '',
    totalWorkDays: totalCutoffWeekdays = 0,
  } = cutOffPeriod || {};

  return (
    <>
      <Paper className="p-4">
        <div className="grid grid-cols-2 gap-5 ">
          {!dataRunPayrollLoading ? (
            <>
              <Description label="Payroll Period" value={format(new Date(periodDate), 'MMMM yyyy')} layout="vertical" />
              {isPayroll && (
                <Description
                  label="CutOff Period"
                  value={`${cutOffPeriodStartDt} - ${cutOffPeriodEndDt} (${totalCutoffWeekdays} weekdays)`}
                  layout="vertical"
                />
              )}
              <Description label="Payment Schedule" value={paymentScheduleDate} layout="vertical" />
              <Description label="Employees" value={String(totalEmployees || '-')} layout="vertical" />
              <Description className="col-start-1" label="Description" value={description} layout="vertical" />
            </>
          ) : (Array(5).fill(null).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex flex-col gap-2 mb-2" key={i}>
              <TextSkeleton width="lg" />
              <TextSkeleton width="xl" />
            </div>
          )))}
          <div>
            <Button className="w-fit" color="primary" variant="outline" onClick={handleOpenForm}>Select Employee</Button>
          </div>
        </div>
        {!!totalEmployees && (
          <>
            <hr className="mt-8" />
            <div className="mt-3">
              <Typography variant="title" className="mb-6">List Employee</Typography>
              <div className="flex justify-items-stretch gap-3 flex-wrap [&>*]:flex-grow [&>*]:flex-shrink [&>*]:basis-0">
                {(widgetSummary && !summaryLoading) ? (Object.entries(widgetSummary).map((el) => (
                  <Widget key={el[0]} label={camelCaseToTitleCase(el[0] || '')} value={toIDR(Number(el[1]))} />
                ))) : (
                  Array(7).fill(null).map((_, i) => (
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
                    rowActions={[
                      {
                        color: 'success',
                        icon: <IcEdit />,
                        onClick: (row) => handleOpenModalEdit(row.employee),
                        tooltip: 'Edit data',
                      },
                    ]}
                    searchPlaceholder="Search by Employee Name"
                    uniqueRowKey="employee"
                    appendHeader={(
                      <Button
                        className="h-fit"
                        color="primary"
                        startIcon={<IcEdit />}
                        onClick={handleOpenModalComponent}
                      >
                        Edit Component
                      </Button>
                    )}
                    showCountTotal
                    totalData={totalEmployees}
                  />
                </Paper>
              </form>
            </div>
          </>
        )}
      </Paper>
      <div className="flex mt-5 gap-3 justify-end pb-12">
        <Button
          variant="outline"
          color="primary"
          onClick={() => onPrevStep()}
        >
          Previous
        </Button>
        <Button
          color="primary"
          onClick={() => onNextStep(id)}
          disabled={!totalEmployees}
        >
          Next
        </Button>
      </div>
      {openForm && (
        <ModalSelectEmployee
          id={id}
          openModal={openForm}
          onCloseModal={() => {
            handleCloseForm();
            invalidateQueries();
          }}
          onCancel={handleCloseForm}
          startDate={cutOffPeriodStartDt}
          endDate={cutOffPeriodEndDt}
        />
      )}
      {openModalEdit && (
        <ModalEditEmployee
          id={id}
          openModal={openModalEdit}
          employeeId={modalEmployeeId}
          onCloseModal={() => {
            handleCloseModalEdit();
            invalidateQueries();
          }}
          onCancel={handleCloseModalEdit}
          isEdit={isEdit}
        />
      )}
      {openModalComponent && (
        <ModalEditComponent
          id={id}
          employeeId={modalEmployeeId}
          openModal={openModalComponent}
          onCloseModal={() => {
            handleCloseModalComponent();
            invalidateQueries();
          }}
          onCancel={handleCloseModalComponent}
          componentData={componentExisting}
        />
      )}
    </>
  );
};

export default EmployeeDataForm;
