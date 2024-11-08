import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { Employee } from '../types/employee';

import employeeFormDetailNormalizer from './normalizers/employeeFormDetailNormalizer';
import { INIT_EMPLOYEE } from './EmployeeForm.constants';
import employeeFormSchema from './EmployeeForm.schemas';
import type { EmployeeFormProps, EmployeeFormSchema } from './EmployeeForm.types';

const useEmployeeForm = (props: EmployeeFormProps) => {
  const { id = '' } = props;
  const isEdit = !!id;
  const router = useRouter();
  const { profile } = useAuthContext();
  const modal = useModalContext();
  const toaster = useToaster();
  const { selectedOrganization } = profile || {};
  const { organizationId = '' } = selectedOrganization || {};
  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_BY_ID, EMPLOYEE } = EMPLOYEE_MGMT;

  const methods = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      ...INIT_EMPLOYEE,
      gender: 'Male',
    },
  });

  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    const firstError = (
      Object.keys(errors) as Array<keyof typeof errors>
    ).reduce<keyof typeof errors | null>((field, a) => {
      const fieldKey = field as keyof typeof errors;
      return errors[fieldKey] ? fieldKey : a;
    }, null);
    const errorField = document.getElementsByName(String(firstError));
    if (errorField.length) {
      errorField[0].focus();
    }
  }, [errors]);

  const {
    handleSubmit,
    reset,
    setError,
  } = methods;

  const handleBack = () => {
    router.push('/master-data/employee-data');
  };

  const {
    data: employeeData,
    isLoading = false,
  } = useGetData<EmployeeFormSchema, Employee>(
    ['employeeDetail'],
    EMPLOYEE_BY_ID(id),
    {
      options: {
        enabled: !!id,
      },
      normalizer: employeeFormDetailNormalizer,
    },
  );

  useEffect(() => {
    reset(employeeData);
  }, [employeeData, reset]);

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['levelPost'],
    !isEdit ? EMPLOYEE : EMPLOYEE_BY_ID(id),
    !isEdit ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              handleBack();
            },
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message, code, payload } = errorData || {};
          if (code === HTTP_CODE.badRequest) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                `${propertyName.charAt(0).toLowerCase()}${propertyName.slice(
                  1,
                )}` as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = (data: EmployeeFormSchema) => {
    const {
      approvalLinesOptional,
      signDate = null,
      endDate = null,
      ...formData
    } = data;
    let approvalLines = [];

    if (
      approvalLinesOptional
        && approvalLinesOptional.employeeApprovals
        && approvalLinesOptional.employeeApprovals.length > 0
        && approvalLinesOptional.employeeApprovals.every((employeeId) => employeeId.trim() !== '')
    ) {
      const approvals = {
        rule: 0,
        employeeApprovalLineId: approvalLinesOptional.employeeApprovalLineId,
        approvals: approvalLinesOptional.approvals || [],
        employeeApprovals: approvalLinesOptional.employeeApprovals || [],
      };
      if (approvals) formData.approvalLines.push(approvals);
    }
    approvalLines = formData.approvalLines.map((item) => {
      const { approvals, ...rest } = item;
      return rest;
    });

    const combinedData = {
      ...formData,
      signDate: signDate || null,
      endDate: endDate || null,
      organizationId,
      approvalLines,
    };

    mutateSubmit(combinedData);
  };

  return {
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    methods,
    handleBack,
    onSubmit,
  };
};

export default useEmployeeForm;
