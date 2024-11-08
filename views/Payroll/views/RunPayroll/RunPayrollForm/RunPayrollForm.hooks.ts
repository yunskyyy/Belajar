import {
  createRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { STEPS } from './RunPayrollForm.constants';
import type { RunPayrollFormProps } from './RunPayrollForm.types';

const useRunPayrollForm = (props: RunPayrollFormProps) => {
  const {
    payrollId = '',
  } = props;

  const { step: initialStep } = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();
  const pathname = usePathname();

  const isEdit = useMemo(() => !!payrollId, [payrollId]);
  const pageTitle = useMemo(() => (pathname.includes('edit') ? 'Edit' : 'Create'), [pathname]);
  const [activeStep, setActiveStep] = useState(initialStep ? Number(initialStep) - 1 : 0);
  const [checklist, setChecklist] = useState(true);
  const [show, setShow] = useState(false);
  const checkboxRef = createRef();

  const handleBack = () => {
    router.push('/payroll/disbursement/run-payroll');
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    router.replace(`${pathname}?step=${activeStep + 2}`);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    router.replace(`${pathname}?step=${activeStep}`);
  };

  const handleChecklist = () => {
    setChecklist(!checklist);
    localStorage.setItem('payroll-checklist', JSON.stringify({ checklist: !show }));
  };

  const handleShowMessage = () => {
    setShow(!show);
  };

  const handleCloseModal = () => {
    setChecklist(false);
  };

  useEffect(() => {
    const payroll = localStorage.getItem('payroll-checklist');
    if (payroll) {
      const obj = JSON.parse(payroll);
      setChecklist(obj.checklist);
    }
  }, []);

  const steps = STEPS;

  return {
    activeStep,
    checklist,
    checkboxRef,
    isEdit,
    pageTitle,
    show,
    steps,
    handleNextStep,
    handleBackStep,
    handleBack,
    handleChecklist,
    handleShowMessage,
    handleCloseModal,
  };
};

export default useRunPayrollForm;
