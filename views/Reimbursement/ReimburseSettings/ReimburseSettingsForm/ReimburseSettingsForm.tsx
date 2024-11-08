'use client';

import { FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import PageHeader from '@/components/ui/PageHeader';

import AmountLimitForm
  from './components/AmountLimitForm/AmountLimitForm';
import ApprovalLineForm
  from './components/ApprovalLineForm';
import SettingsForm
  from './components/SettingsForm';
import useReimburseSettingsForm
  from './ReimburseSettingsForm.hooks';
import type {
  ReimburseSettingsFormParams, ReimburseSettingsFormSchema,
} from './ReimburseSettingsForm.types';

const ReimburseSettingsForm = (props: ReimburseSettingsFormParams) => {
  const {
    id = '',
  } = props;

  const {
    handleSubmit,
    methods,
    handleBack,
    onSubmit,
    isSubmitting,
  } = useReimburseSettingsForm(props);

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title={`${!id ? 'Add' : 'Edit'} Reimburse Settings`}
          crumbs={[
            { label: 'Dashboard' },
            { label: 'Reimburse Settings' },
            { label: `${!id ? 'Add' : 'Edit'} Reimburse Settings` },
          ]}
          showBackBtn
          onClickBackBtn={handleBack}
        />
      </Paper>

      <FormProvider<ReimburseSettingsFormSchema> {...methods}>
        <form className="flex flex-col gap-5 my-5">
          <SettingsForm />
          <ApprovalLineForm />
          <AmountLimitForm />
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
              {`${!id ? 'Save' : 'Edit'} Data Employee`}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ReimburseSettingsForm;
