import { useEffect, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { EmployeeFormSchema } from '../../EmployeeForm.types';

import type { EmployeeQuery } from './ApprovalLineForm.types';

const useApprovalLineForm = () => {
  const {
    control,
    getValues,
    setValue,
  } = useFormContext<EmployeeFormSchema>();

  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_SEARCH_APPROVE } = EMPLOYEE_MGMT;

  const { approvalLines = [], approvalLinesOptional } = useWatch({ control });

  const getNonEmptyEmployeeIds = (): string[] => {
    const newArr: string[] = [];
    if (approvalLines) {
      approvalLines.forEach((item) => {
        const { employeeApprovals } = item;
        if (employeeApprovals && employeeApprovals.length > 0) {
          employeeApprovals.forEach((id) => {
            if (id && id.trim() !== '') {
              newArr.push(id.trim());
            }
          });
        }
      });
    }
    if (approvalLinesOptional) {
      if (
        approvalLinesOptional.employeeApprovals
        && approvalLinesOptional.employeeApprovals.length > 0) {
        approvalLinesOptional.employeeApprovals.forEach((id) => {
          if (id && id.trim() !== '') {
            newArr.push(id.trim());
          }
        });
      }
    }
    return newArr;
  };

  const [query, setQuery] = useState<EmployeeQuery>({
    s: '',
    employeeIds: getNonEmptyEmployeeIds(),
  });

  const [employeeValueLine1, setEmployeeValueLine1] = useState<Array<{
    value: string,
    label: string,
  }>>(
    (approvalLines[0]
    && approvalLines[0].approvals)
      ? approvalLines[0].approvals.map((item) => ({
        value: item?.value || '',
        label: item?.label || '',
      })) : [{
        value: '',
        label: '',
      }],
  );

  const [employeeSearchValueLine1, setEmployeeSearchValueLine1] = useState<string[]>(['']);
  const [employeeSearchValueLine2, setEmployeeSearchValueLine2] = useState('');
  const [employeeSearchValueLine3, setEmployeeSearchValueLine3] = useState('');

  const addApprover = () => {
    setEmployeeValueLine1((prevState) => [
      ...prevState,
      {
        value: '',
        label: '',
      },
    ]);
    const newArr = getValues('approvalLines');
    if (newArr && newArr[0].employeeApprovals) {
      newArr[0].employeeApprovals.push('');
      setValue('approvalLines', newArr);
    } else if (!newArr[0].employeeApprovals) {
      newArr[0].employeeApprovals = newArr[0].employeeApprovals ?? [];
      newArr[0].employeeApprovals.push('');
      setValue('approvalLines', newArr);
    }
  };

  const deleteApprover = (
    indexToRemove: number,
    valueToRemove: { value: string, label: string } | null | undefined,
  ) => {
    if (valueToRemove) {
      setQuery((prev) => ({
        s: '',
        employeeIds: prev.employeeIds.filter((employeeId) => employeeId !== valueToRemove.value),
      }));
    }
    setEmployeeValueLine1((prevState) => {
      const newArray = [...prevState];
      newArray.splice(indexToRemove, 1);
      return newArray;
    });

    const newArr = getValues('approvalLines');
    if (newArr && newArr[0].employeeApprovals) {
      newArr[0].employeeApprovals = newArr[0].employeeApprovals.filter(
        (__, i) => i !== indexToRemove,
      );
      if (newArr[0].approvals) {
        newArr[0].approvals = newArr[0].approvals.filter(
          (__, i) => i !== indexToRemove,
        );
      }
      setValue('approvalLines', newArr);
    }
  };

  const {
    data: employeeApproverOption = [],
    refetch,
  } = useGetData<SelectItem[], SearchOptions>(
    ['employeeApproverData'],
    EMPLOYEE_SEARCH_APPROVE,
    {
      normalizer: selectOptionNormalizer,
      options: {
        enabled: false,
      },
      params: {
        s: query.s,
        employeeIds: query.employeeIds,
      },
    },
  );

  const handleEmployeeLine1SearchChange = (value: string, index: number) => {
    setEmployeeSearchValueLine1((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
    setQuery({
      employeeIds: getNonEmptyEmployeeIds(),
      s: value,
    });
  };

  const handleEmployeeLine2SearchChange = (value: string) => {
    setEmployeeSearchValueLine2(value);
    setQuery({
      ...query,
      s: value,
    });
  };

  const handleEmployeeLine3SearchChange = (value: string) => {
    setEmployeeSearchValueLine3(value);
    setQuery({
      ...query,
      s: value,
    });
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return {
    control,
    employeeApproverOption,
    employeeSearchValueLine1,
    employeeSearchValueLine2,
    employeeSearchValueLine3,
    approvalLines,
    employeeValueLine1,
    addApprover,
    deleteApprover,
    handleEmployeeLine1SearchChange,
    handleEmployeeLine2SearchChange,
    handleEmployeeLine3SearchChange,
    setEmployeeValueLine1,
    setQuery,
    getNonEmptyEmployeeIds,
    getValues,
    setValue,
  };
};

export default useApprovalLineForm;
