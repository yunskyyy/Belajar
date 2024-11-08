import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { usePutData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { noop } from '@/utils';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';

import { INIT_DATA_EMPLOYEE } from './ModalEmployee.constants';
import dataEmployeeSchema from './ModalEmployee.schema';
import type { ComponentThr, DataEmployeeFormSchema, ListEditComponent } from './ModalEmployee.types';

const useModalEmployee = (props: ModalEmployeeProps) => {
  const {
    onCloseModal = noop,
    isEdit = false,
    employeeId = '',
  } = props;
  const toaster = useToaster();
  const [tabValue, setTabValue] = useState(0);
  const { RUN_THR_MGMT } = ENDPOINT;
  const { COMPONENT_EMPLOYEE } = RUN_THR_MGMT;

  const {
    data: componentData,
    isLoading,
  } = useGetData<ListEditComponent>(
    ['editComponentData', employeeId],
    COMPONENT_EMPLOYEE(employeeId),
    {
      options: {
        enabled: !!employeeId,
      },
    },
  );

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  const methods = useForm<DataEmployeeFormSchema>({
    resolver: zodResolver(dataEmployeeSchema),
    defaultValues: {
      ...INIT_DATA_EMPLOYEE,
    },
  });

  const {
    setValue,
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (componentData) {
      if (componentData.items.allowance) {
        const componentsAllowance = componentData.items.allowance
          .filter((item) => item.exactAmount !== 0)
          .map((el) => ({
            amount: el.exactAmount,
            name: el.name,
            id: el.id,
          }));
        setValue('componentsAllowance', componentsAllowance);
      }
      if (componentData.items.salary) {
        const componentsSalary = componentData.items.salary
          .filter((item) => item.exactAmount !== 0)
          .map((el) => ({
            amount: el.exactAmount,
            name: el.name,
            id: el.id,
          }));
        setValue('componentsSalary', componentsSalary);
      }
      if (componentData.items.benefit) {
        const componentsBenefit = componentData.items
          .benefit.filter((item) => item.exactAmount !== 0)
          .map((el) => ({
            amount: el.exactAmount,
            name: el.name,
            id: el.id,
          }));
        setValue('componentsBenefit', componentsBenefit);
      }
    }
  }, [componentData, setValue, isEdit]);

  const { mutate: mutateSubmit, isLoading: isSubmitting } = usePutData(
    ['editEmployeeThr', employeeId],
    COMPONENT_EMPLOYEE(employeeId),
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

  const onSubmit = (dataEmployee: DataEmployeeFormSchema) => {
    const components: ComponentThr[] = [];
    if (dataEmployee.componentsAllowance.length !== 0) {
      dataEmployee.componentsAllowance.forEach((el) => {
        components.push({
          itemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    if (dataEmployee.componentsBenefit.length !== 0) {
      dataEmployee.componentsBenefit.forEach((el) => {
        components.push({
          itemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    if (dataEmployee.componentsSalary.length !== 0) {
      dataEmployee.componentsSalary.forEach((el) => {
        components.push({
          itemComponentId: el.id,
          exactAmount: el.amount,
        });
      });
    }

    mutateSubmit(components);
  };

  return {
    handleChangeTab,
    tabValue,
    methods,
    onSubmit,
    handleSubmit,
    componentData,
    isLoading,
    isSubmitting,
  };
};

export default useModalEmployee;
