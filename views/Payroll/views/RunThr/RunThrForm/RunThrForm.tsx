'use client';

import Paper from '@/components/base/Paper';
import PageHeader from '@/components/ui/PageHeader';
import Stepper from '@/components/ui/Stepper';

import Review from '../../../components/Review';

import EmployeeDataForm from './components/EmployeeDataForm';
import ThrPeriod from './components/ThrPeriod';
import useRunThrForm from './RunThrForm.hooks';
import type { RunThrFormProps } from './RunThrForm.types';

const RunThrForm = (props: RunThrFormProps) => {
  const { runThrId = '' } = props;
  const {
    handleBack,
    steps,
    isEdit,
    activeStep,
    handleNextStep,
    handleBackStep,
  } = useRunThrForm();

  return (
    <>
      <Paper className="p-4 mb-5">
        <div className="flex justify-between items-center">
          <PageHeader
            title={`${!isEdit ? 'Create' : 'Edit'} Run THR`}
            crumbs={[{ label: 'Disbursement' }, { label: 'Run THR', href: '/payroll/disbursement/run-thr' },
              { label: `${!isEdit ? 'Create' : 'Edit'} Run THR` }]}
            showBackBtn
            onClickBackBtn={handleBack}
          />
        </div>
      </Paper>
      <Paper className="p-4 mb-5">
        <Stepper alternativeLabel activeStep={activeStep} steps={steps} />
      </Paper>
      <Paper className="p-4">
        {activeStep === 0 && (
          <ThrPeriod onNextStep={handleNextStep} isEdit={isEdit} id={runThrId} />
        )}
        {activeStep === 1 && (
          <EmployeeDataForm
            onPrevStep={handleBackStep}
            id={runThrId}
            isEdit={isEdit}
            onNextStep={handleNextStep}
          />
        )}
        {activeStep === 2 && (
          <Review
            onPrevStep={handleBackStep}
            id={runThrId}
            isEdit={isEdit}
            onNextStep={handleNextStep}
          />
        )}
      </Paper>
    </>
  );
};

export default RunThrForm;
