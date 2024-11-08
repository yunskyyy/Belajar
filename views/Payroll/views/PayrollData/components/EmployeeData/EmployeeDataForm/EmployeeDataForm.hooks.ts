import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData, usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ComponentItem, EmployeeDatum } from '../types/employeeData';

import employeeDataNormalizer from './normalizers/employeeDataNormalizer';
import { INIT_FILTER, TABLE_COLUMNS } from './EmployeeDataForm.constants';
import employeeDataFormSchema from './EmployeeDataForm.schemas';
import type { EmployeeDataFormFilter, EmployeeDataFormSchema } from './EmployeeDataForm.types';

const useEmployeeDataForm = (id: string) => {
  const modal = useModalContext();
  const toaster = useToaster();
  const router = useRouter();

  const {
    PAYROLLS: {
      EMPLOYEE_BY_ID,
      EMPLOYEE_COMPONENT,
      EMPLOYEE_SET_EXPIRED,
    },
  } = ENDPOINT;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [filterParams, setFilterParams] = useState<EmployeeDataFormFilter>(INIT_FILTER);
  const [expiredMinDate, setExpiredMinDate] = useState(new Date());

  const methods = useForm<EmployeeDataFormSchema>({
    resolver: zodResolver(employeeDataFormSchema),
    defaultValues: {
      type: '0',
      effectiveDate: '',
      amount: '0',
      newAmount: '0',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
  } = methods;

  const {
    componentName = '',
  } = useWatch({ control });

  const {
    data: employeeData,
    refetch: refetchEmployee,
    isLoading,
  } = useGetData<EmployeeDatum>(
    ['employeePayrollDetail', id],
    EMPLOYEE_BY_ID(id),
    {
      normalizer: employeeDataNormalizer,
      options: {
        enabled: !!id,
      },
    },
  );

  const { items = [] } = employeeData || {};
  const [componentItemsDisplay, setComponentItemsDisplay] = useState<ComponentItem[]>([...items]);

  useEffect(() => {
    if (employeeData) {
      setComponentItemsDisplay(employeeData.items);
    }
  }, [employeeData]);

  const componentNameFilterOption = [...new Set(items.map((item) => item.componentId))]
    .map((el) => ({ value: el, label: items.find((item) => item.componentId === el)?.componentName || '' }));

  const componentTypeFilterOption = [...new Set(items.map((item) => item.componentTypeId))]
    .map((el) => ({ value: el, label: items.find((item) => item.componentTypeId === el)?.componentTypeName || '' }));

  const tableColumn = TABLE_COLUMNS({
    componentNameFilterOption,
    componentTypeFilterOption,
  });

  const handleBack = () => {
    router.push('/payroll/payroll-data/employee');
  };

  const { mutate: mutateDelete, isLoading: isDeleting } = useDeleteData(
    ['deleteDataPayroll', id],
    EMPLOYEE_COMPONENT(id),
    {
      options: {
        onSuccess: () => {
          refetchEmployee();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully deleted',
            onConfirm: () => {
              modal.closeConfirm();
            },
          });
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

  const handleDelete = (employeeComponentId: string) => {
    modal.confirm({
      title: 'Delete selected data?',
      content: 'Are you sure you want to delete this component?',
      buttonProps: {
        confirm: {
          label: 'Delete',
          loading: isDeleting,
        },
      },
      onConfirm: () => mutateDelete({ employeeComponentId }),
      onCancel: () => modal.closeConfirm(),
      danger: true,
    });
  };

  const handleFilterChange = (value: Record<string, string>) => {
    const newFilterParams = { ...filterParams, ...value };
    let filteredList: ComponentItem[];
    setComponentItemsDisplay([]);
    filteredList = [...items];
    for (const key of Object.keys(newFilterParams)) {
      filteredList = filteredList.filter(
        (el) => ((
          el[key] as string).toString()
          .toLowerCase().indexOf(newFilterParams[key]
            .toLowerCase()) !== -1),
      );
    }
    setComponentItemsDisplay(filteredList);
    setFilterParams(newFilterParams);
  };

  const handleEdit = (data: ComponentItem) => {
    setShowEditModal(true);
    reset({
      type: String(data.type),
      newAmount: String(data.newAmountNumber),
      effectiveDate: data.effectiveDateOrigin,
      employeeComponentId: data.employeeComponentId,
      componentId: data.componentId,
      componentName: data.componentName,
      componentTypeId: data.componentTypeId,
      amount: String(data.amountNumber),
      componentNameObject: {
        label: data.componentName,
        value: data.componentId,
      },
    });
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    reset({
      type: '0',
      effectiveDate: '',
      amount: '0',
      newAmount: '0',
    });
  };

  const handleExpired = (data: ComponentItem) => {
    setShowExpiredModal(true);
    if (!data.status) {
      const foundComponent = items.findLast((el) => (
        el.employeeComponentId
        && el.componentId === data.componentId
        && !el.type
      ));
      if (foundComponent) {
        setExpiredMinDate(
          addDays(new Date(
            new Date(
              foundComponent.effectiveDateOrigin,
            ).setHours(0),
          ), 1),
        );
      }
    } else {
      setExpiredMinDate(
        addDays(new Date(
          new Date(
            data.effectiveDateOrigin,
          ).setHours(0),
        ), 1),
      );
    }
    reset({
      type: '1',
      newAmount: '0',
      effectiveDate: '',
      employeeComponentId: data.employeeComponentId,
      componentId: data.componentId,
      componentName: data.componentName,
      componentTypeId: data.componentTypeId,
      amount: '0',
      componentNameObject: {
        value: data.componentId,
        label: data.componentName,
      },
    });
    if (!data.status && data.type === 1) {
      setValue('effectiveDate', data.effectiveDateOrigin);
    }
  };

  const handleCloseExpired = () => {
    setShowExpiredModal(false);
    reset({
      type: '0',
      effectiveDate: '',
      amount: '0',
      newAmount: '0',
    });
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = usePostData(
    ['editDataPayroll', id],
    showExpiredModal ? EMPLOYEE_SET_EXPIRED(id) : EMPLOYEE_COMPONENT(id),
    {
      options: {
        onSuccess: () => {
          refetchEmployee();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              handleCloseExpired();
              handleCloseEdit();
            },
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message, code, payload } = errorData || {};
          if (code === HTTP_CODE.badRequest && payload) {
            (payload || []).forEach((el) => {
              const {
                propertyName,
                message: payloadMessage,
              } = el;
              const fieldNames = propertyName.split('.');
              const fieldChild = (fieldNames[1] || '').charAt(0)
                .toLowerCase() + (fieldNames[1] || '').slice(1);
              setError(
                fieldChild as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = (data: EmployeeDataFormSchema) => {
    const formData = {
      ...data,
      type: showExpiredModal ? 0 : Number(data.type),
    };
    mutateSubmit(formData);
  };

  return {
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
  };
};

export default useEmployeeDataForm;
