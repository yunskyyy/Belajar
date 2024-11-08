'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Checkbox from '@/components/base/Checkbox';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import { IcComponent, IcPayrollData } from '@/components/icons';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';
import Stepper from '@/components/ui/Stepper';

import EmployeeDataForm from '../../../components/EmployeeDataForm';
import Review from '../../../components/Review';

import PayrollPeriod from './components/PayrollPeriod';
import useRunPayrollForm from './RunPayrollForm.hooks';
import type { RunPayrollFormProps } from './RunPayrollForm.types';

const RunPayrollForm = (props: RunPayrollFormProps) => {
  const { payrollId = '' } = props;
  const {
    activeStep,
    checklist,
    isEdit,
    pageTitle,
    show,
    steps,
    handleBack,
    handleChecklist,
    handleNextStep,
    handleBackStep,
    handleShowMessage,
    handleCloseModal,
  } = useRunPayrollForm(props);

  return (
    <>
      <Paper className="p-4 mb-5">
        <div className="flex justify-between items-center">
          <PageHeader
            title={`${pageTitle} Run Payroll`}
            crumbs={[{ label: 'Disbursement' },
              { label: 'Run Payroll', href: '/payroll/disbursement/run-payroll' },
              { label: `${pageTitle} Run Payroll` }]}
            showBackBtn
            onClickBackBtn={handleBack}
          />
        </div>
      </Paper>
      <Paper className="p-4 mb-5">
        <Stepper alternativeLabel activeStep={activeStep} steps={steps} />
      </Paper>
      {activeStep === 0 && (
        <PayrollPeriod
          onNextStep={handleNextStep}
          id={payrollId}
          isEdit={isEdit}
        />
      )}
      {activeStep === 1 && (
        <EmployeeDataForm
          onNextStep={handleNextStep}
          onPrevStep={handleBackStep}
          isEdit={isEdit}
          id={payrollId}
        />
      )}
      {activeStep === 2 && (
        <Review onPrevStep={handleBackStep} id={payrollId} />
      )}
      {checklist
        && (
          <Modal
            open={checklist}
            title="Run Payroll Checklist"
            width={722}
            onClose={handleCloseModal}
          >
            <Modal.Content className="flex flex-col gap-3 [&>*>*]:text-n-6">
              <div className="flex gap-1">
                <IcPayrollData />
                <Typography>
                  Make sure that all empoyee data are entered correctly and are included in payroll.
                </Typography>
                <Link href="/payroll/payroll-data" target="_blank">
                  <Typography variant="link">Open Payroll Data</Typography>
                </Link>
              </div>
              <div className="flex gap-1">
                <IcComponent />
                <Typography>
                  Make sure that the payroll component are updated.
                </Typography>
                <Link href="/payroll/payroll-component" target="_blank">
                  <Typography variant="link">Update Payroll Component</Typography>
                </Link>
              </div>
            </Modal.Content>
            <Modal.Footer className="flex justify-between gap-4">
              <Checkbox checked={show} onChange={handleShowMessage} label="Don’t show this again" />
              <Button
                color="primary"
                type="button"
                onClick={handleChecklist}
              >
                Run Payroll
              </Button>
            </Modal.Footer>
          </Modal>
        )}
    </>
  );
};

export default RunPayrollForm;
