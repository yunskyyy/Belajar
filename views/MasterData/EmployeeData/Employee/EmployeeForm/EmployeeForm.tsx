'use client';

import { FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import PageHeader from '@/components/ui/PageHeader';

import ApprovalLineForm from './components/ApprovalLineForm';
import EmployeeCareerForm from './components/EmployeeCareerForm';
import EmployeeProfileForm from './components/EmployeeProfileForm';
import PayrollInformationForm from './components/PayrollInformationForm';
import useEmployeeForm from './EmployeeForm.hooks';
import type { EmployeeFormProps, EmployeeFormSchema } from './EmployeeForm.types';

const EmployeeForm = (props: EmployeeFormProps) => {
  const {
    handleSubmit,
    isEdit,
    isSubmitting,
    methods,
    handleBack,
    onSubmit,
  } = useEmployeeForm(props);
  return (
    <>
      <PageHeader
        title={`${!isEdit ? 'Create' : 'Edit'} Data Employee`}
        crumbs={[
          { label: 'Master Data' },
          { label: 'Master Data Employee', href: '/master-data/employee' },
          { label: `${!isEdit ? 'Create' : 'Edit'} Data Employee` },
        ]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
      <FormProvider<EmployeeFormSchema> {...methods}>
        <form className="flex flex-col gap-5 my-5">
          <EmployeeProfileForm isEdit={isEdit} />
          <EmployeeCareerForm />
          <PayrollInformationForm />
          <ApprovalLineForm />
          <div className="my-5 flex justify-end gap-5">
            <Button
              variant="outline"
              color="danger"
              className="w-36"
              disabled={isSubmitting}
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              color="primary"
              loading={isSubmitting}
            >
              {`${!isEdit ? 'Save' : 'Edit'} Data Employee`}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default EmployeeForm;
