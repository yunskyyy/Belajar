import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import { IcEdit } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Description from '@/components/ui/Description';
import { camelCaseToTitleCase, noop, toIDR } from '@/utils';
import ModalSelectEmployee from '@/views/Payroll/components/ModalSelectEmployee';

import type { RunThrComponentProps } from '../../types/runThrType';

import ModalEmployee from './components/ModalEmployee/ModalEmployee';
import Widget from './components/Widget';
import { HIDEABLE_COLUMNS } from './EmployeeDataForm.constants';
import useEmployeeDataForm from './EmployeeDataForm.hooks';

const EmployeeDataForm = (props: RunThrComponentProps) => {
  const { id = '', onNextStep = noop, onPrevStep = noop } = props;
  const {
    detailRunThr,
    dataListEmployee,
    isLoading,
    isLoadingWidget,
    modalEmployeeId,
    openForm,
    openModalEdit,
    queryParams,
    tableColumns,
    widgetSummary,
    handleOpenForm,
    handleCloseForm,
    handleCloseModalEdit,
    handleOpenModalEdit,
    onFilterChange,
    onSearchChange,
    onPageChange,
    onSortChange,
    onPageSizeChange,
  } = useEmployeeDataForm(props);

  const {
    totalEmployees,
    periodDate,
    paymentScheduleDate,
    description,
  } = detailRunThr || {};
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Description label="THR Period" value={`${periodDate}`} layout="vertical" />
        <Description label="Payment Schedule" value={`${paymentScheduleDate}`} layout="vertical" />
        <Description label="Employees" value={`${totalEmployees}`} layout="vertical" />
        <Description className="col-start-1" label="Description" value={`${description}`} layout="vertical" />
        <div>
          <Button className="w-fit" color="primary" variant="outline" onClick={handleOpenForm}>Select Employee</Button>
        </div>
      </div>
      {totalEmployees !== 0 && (
        <>
          <hr className="mt-8" />
          <div className="mt-3">
            <Typography variant="title">List Employee</Typography>
            <div className="flex justify-items-stretch gap-3 flex-wrap [&>*]:flex-grow [&>*]:flex-shrink [&>*]:basis-0">
              {(widgetSummary && !isLoadingWidget) ? (
                (Object.entries(widgetSummary.summary).map((el) => (
                  <Widget key={el[0]} label={camelCaseToTitleCase(el[0] || '')} value={toIDR(Number(el[1]))} />
                ))))
                : (
                  Array(7).fill(null).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                    <div className="bg-n-4 w-28 h-24 rounded-xl animate-pulse" key={i} />
                  ))
                )}
              {widgetSummary
                && <Widget label="Total" value={toIDR(Number(widgetSummary?.total || 0))} />}
            </div>
            <Paper className="flex flex-col gap-4 mb-6">
              <DataTable
                columns={tableColumns}
                data={(dataListEmployee && dataListEmployee.items) || []}
                rowActions={[
                  {
                    color: 'success',
                    icon: <IcEdit />,
                    onClick: (row) => handleOpenModalEdit(row),
                  },
                ]}
                hiddenColumns={
                  HIDEABLE_COLUMNS.map((el) => {
                    const widgetKeys = Object.keys(widgetSummary?.summary || {})
                      .map((key) => key.toLowerCase());
                    return !widgetKeys.includes(el) ? el : '';
                  })
                }
                onFilterChange={onFilterChange}
                onPageChange={onPageChange}
                onSortChange={onSortChange}
                page={queryParams.page}
                pageSize={queryParams.size}
                onSearchChange={onSearchChange}
                onPageSizeChange={onPageSizeChange}
                searchPlaceholder="Search by Employee Name"
                showPagination
                uniqueRowKey="id"
                showAuditTrail={false}
                loading={isLoading}
              />
            </Paper>
          </div>
        </>
      )}
      <div className="flex justify-end">
        <div className="flex mt-5 gap-3 justify-between">
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
            disabled={totalEmployees === 0}
          >
            Next
          </Button>
        </div>
      </div>
      {openForm && (
        <ModalSelectEmployee
          onCancel={handleCloseForm}
          id={id}
          openModal={openForm}
          onCloseModal={handleCloseForm}
        />
      )}
      {openModalEdit && (
        <ModalEmployee
          onCancel={handleCloseForm}
          id={id}
          openModal={openModalEdit}
          onCloseModal={handleCloseModalEdit}
          employeeId={modalEmployeeId}
        />
      )}
    </>
  );
};

export default EmployeeDataForm;
