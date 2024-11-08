import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { STEPS } from './RunThrForm.constants';

const useRunThrForm = () => {
  const { step: initialStep } = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();
  const pathname = usePathname();
  const isEdit = useMemo(() => pathname.includes('edit'), [pathname]);
  const [activeStep, setActiveStep] = useState(initialStep ? Number(initialStep) - 1 : 0);
  const pageTitle = useMemo(() => (isEdit ? 'Edit' : 'Save'), [isEdit]);

  const handleBack = () => {
    router.push('/payroll/disbursement/run-thr');
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    router.replace(`${pathname}?step=${activeStep}`);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    router.replace(`${pathname}?step=${activeStep + 2}`);
  };

  const steps = STEPS;

  return {
    activeStep,
    steps,
    handleNextStep,
    handleBackStep,
    isEdit,
    pageTitle,
    handleBack,
  };
};

export default useRunThrForm;
