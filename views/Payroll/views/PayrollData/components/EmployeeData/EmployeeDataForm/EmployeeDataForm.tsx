'use client';

import { Controller, FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Ticker from '@/components/base/Ticker';
import Typography from '@/components/base/Typography';
import {
  IcAdd,
  IcEdit,
  IcExpired,
  IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Description from '@/components/ui/Description';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';
import { formatDateApi } from '@/utils';

import EmployeeDataFields from './components/EmployeeDataFields';
import { FORM_TICKER_CONTENT } from './EmployeeDataForm.constants';
import useEmployeeDataForm from './EmployeeDataForm.hooks';
import type { EmployeeDataFormSchema } from './EmployeeDataForm.types';

const EmployeeDataForm = ({ id }: { id: string }) => {
  const {
    componentName,
    componentItemsDisplay,
    control,
    employeeData,
    expiredMinDate,
    handleSubmit,
    methods,
    isLoading,
    isSubmitting,
    showEditModal,
    showExpiredModal,
    tableColumn,
    handleBack,
    handleCloseExpired,
    handleDelete,
    handleCloseEdit,
    handleEdit,
    handleExpired,
    handleFilterChange,
    onSubmit,
  } = useEmployeeDataForm(id);

  const {
    employeeIdNumber = '',
    employeeName = '',
    items = [],
  } = employeeData || {};
  return (
    <FormProvider<EmployeeDataFormSchema> {...methods}>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Edit Payroll Data"
          crumbs={[
            { label: 'Payroll' },
            {
              label: 'Payroll Data',
              href: '/payroll/payroll-data/employee',
            },
            { label: 'Edit Payroll Data' },
          ]}
          showBackBtn
          onClickBackBtn={handleBack}
        />
        <Paper title="Employee Information" className="p-4">
          <div className="grid grid-cols-2">
            <Description label="Employee ID" value={employeeIdNumber} layout="vertical" />
            <Description label="Employee Name" value={employeeName} layout="vertical" />
          </div>
        </Paper>
        {isLoading ? (
          <div className="bg-n-5 h-[600px] rounded animate-pulse" />
        ) : (
          <Paper className="p-4 gap-y-4">
            <Ticker
              type="info"
              text={FORM_TICKER_CONTENT}
            />
            <form className="mb-8">
              <EmployeeDataFields componentItems={items} />
              <div className="flex justify-end">
                <Button
                  className="ml-auto"
                  color="primary"
                  type="button"
                  startIcon={<IcAdd />}
                  loading={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  Add Component Data
                </Button>
              </div>
            </form>
            <hr />
            <Typography variant="title" type="secondary">Component Payroll Data</Typography>
            <DataTable
              data={componentItemsDisplay}
              columns={tableColumn}
              loading={isLoading}
              onFilterChange={handleFilterChange}
              uniqueRowKey="employeeComponentId"
              showAuditTrail={false}
              showPageSizeChanger={false}
              showPagination={false}
              showSearch={false}
              rowActions={[
                {
                  color: 'success',
                  icon: <IcEdit />,
                  onClick: handleEdit,
                  tooltip: 'Edit data',
                  disabledFn: (row) => row.status,
                  showFn: (row) => row.type === 0,
                },
                {
                  color: 'warning',
                  icon: <IcExpired />,
                  onClick: handleExpired,
                  disabledFn: (row) => row.type > 0 && row.status,
                  tooltip: 'Set Expired',
                },
                {
                  color: 'danger',
                  icon: <IcTrash />,
                  onClick: (row) => handleDelete(row.employeeComponentId),
                  tooltip: 'Delete data',
                  disabledFn: (row) => row.status,
                },
              ]}
            />
          </Paper>
        )}
      </div>
      <Modal
        open={showExpiredModal}
        title="Set as Expired"
        width={480}
        onClose={handleCloseExpired}
      >
        <Modal.Content>
          <Controller
            control={control}
            name="effectiveDate"
            render={(
              {
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              },
            ) => (
              <DatePicker
                ref={ref}
                onChange={
                  (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                }
                value={value ? new Date(value) : null}
                error={!!error}
                message={error && error.message}
                minDate={expiredMinDate}
                label={`Are you sure to change “${componentName}” as expired Type?`}
                placeholder="Select Effective Date"
                block
              />
            )}
          />
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-end gap-2 w-full">
            <Button
              variant="text"
              color="default"
              onClick={handleCloseExpired}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        open={showEditModal}
        title="Edit Payroll Data"
        width={960}
        onClose={handleCloseEdit}
      >
        <Modal.Content>
          <EmployeeDataFields componentItems={items} />
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-end gap-2 w-full">
            <Button
              variant="text"
              color="default"
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              Edit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </FormProvider>
  );
};

export default EmployeeDataForm;
