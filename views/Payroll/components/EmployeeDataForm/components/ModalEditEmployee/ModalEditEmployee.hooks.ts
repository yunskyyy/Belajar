import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { usePutData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { noop } from '@/utils';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';

import listEditEmployeeNormalizer from './normalizers/listEditEmployeeNormalizer';
import { INIT_DATA_EMPLOYEE } from './ModalEditEmployee.constants';
import dataEmployeeSchema from './ModalEditEmployee.schema';
import type { Components, DataEmployeeFormSchema, ListEditEmployee } from './ModalEditEmployee.types';

const useModalEditEmployee = (props: ModalEmployeeProps) => {
  const {
    employeeId = '',
    id = '',
    isEdit = false,
    onCloseModal = noop,
  } = props;

  const [tabValue, setTabValue] = useState(0);
  const [componentId, setComponentId] = useState('');
  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const toaster = useToaster();
  const {
    RUN_PAYROLL_EMPLOYEE,
    UPDATE_EDIT_EMPLOYEE,
  } = DISBURSEMENT_MGMT;

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  const methods = useForm<DataEmployeeFormSchema>({
    resolver: zodResolver(dataEmployeeSchema),
    defaultValues: { ...INIT_DATA_EMPLOYEE },
  });

  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = methods;

  const {
    data: employeeData,
    isLoading,
  } = useGetData<ListEditEmployee>(
    ['editEmployeeData', employeeId],
    RUN_PAYROLL_EMPLOYEE(id, employeeId),
    {
      normalizer: listEditEmployeeNormalizer,
      options: {
        enabled: !!employeeId,
      },
    },
  );

  useEffect(() => {
    if (employeeData) {
      setComponentId(employeeData.payrollDisbursementItemId);
      const componentsAllowance = employeeData.componentsAllowance.map((el) => ({
        amount: el.amount,
        id: el.id,
        type: el.type,
        name: el.name,
      }));
      const componentsSalary = employeeData.componentsSalary.map((el) => ({
        amount: el.amount,
        id: el.id,
        type: el.type,
        name: el.name,
      }));
      const componentsBenefit = employeeData.componentsBenefit.map((el) => ({
        amount: el.amount,
        id: el.id,
        type: el.type,
        name: el.name,
      }));

      const deductions = employeeData.deductions.map((el) => ({
        amount: el.amount,
        id: el.id,
        name: el.name,
      }));
      if (isEdit) {
        const additionalEarnings = employeeData.additionalEarnings
          .filter((el) => el.schedulePaymentDate && !el.isDeleted)
          .map((el) => ({
            additionalEarningId: el.additionalEarningId,
            amount: el.amount,
            id: el.id,
            projectId: el.projectId,
            projectCode: el.projectCode,
            projectName: el.projectName,
            type: el.type,
            date: el.date,
          }));
        setValue('additionalEarnings', additionalEarnings);
      }
      setValue('componentsAllowance', componentsAllowance);
      setValue('componentsSalary', componentsSalary);
      setValue('componentsBenefit', componentsBenefit);
      setValue('deductions', deductions);
    }
  }, [employeeData, setValue, isEdit]);

  const { mutate: mutateSubmit, isLoading: isSubmitting } = usePutData(
    ['editEmployeePayroll', employeeId],
    UPDATE_EDIT_EMPLOYEE(id, componentId, employeeId),
    {
      options: {
        onSuccess: () => {
          onCloseModal();
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message } = errorData || {};

          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = (data: DataEmployeeFormSchema) => {
    const earnings = data.additionalEarnings.map((el) => ({
      additionalEarningId: el.additionalEarningId,
      id: el.id,
      type: Number(el.type),
      amount: el.amount,
      isDeleted: !!el.isDeleted,
    }));

    const deductions = data.deductions.map((el) => ({
      id: el.id,
      deductionName: el.name,
      amount: el.amount,
      isDeleted: el.isDeleted,
    }));

    const components: Components[] = [];
    if (data.componentsAllowance.length !== 0) {
      data.componentsAllowance.forEach((el) => {
        components.push({
          payrollDisbursementItemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    if (data.componentsBenefit.length !== 0) {
      data.componentsBenefit.forEach((el) => {
        components.push({
          payrollDisbursementItemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    if (data.componentsSalary.length !== 0) {
      data.componentsSalary.forEach((el) => {
        components.push({
          payrollDisbursementItemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    const formData = {
      earnings,
      components: components.filter((el) => el.payrollDisbursementItemComponentId),
      deductions,
      pendings: data.pendings,
    };

    mutateSubmit(formData);
  };

  return {
    employeeId,
    employeeData,
    errors,
    handleSubmit,
    isLoading,
    isSubmitting,
    methods,
    tabValue,
    handleChangeTab,
    onSubmit,
  };
};

export default useModalEditEmployee;
