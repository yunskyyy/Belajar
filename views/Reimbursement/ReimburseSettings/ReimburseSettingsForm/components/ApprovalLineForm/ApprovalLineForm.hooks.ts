import { useEffect, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { ReimburseSettingsFormSchema } from '../../ReimburseSettingsForm.types';

import type {
  EmployeeQuery,
} from './ApprovalLineForm.type';

const useApprovalLineForm = () => {
  const {
    control,
    getValues,
    setValue,
  } = useFormContext<ReimburseSettingsFormSchema>();

  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_SETTINGS } = REIMBURSEMENT;
  const { EMPLOYEE_SEARCH } = REIMBURSE_SETTINGS;

  const { approvalLines = [], approvalLinesOptional = [] } = useWatch({ control });

  const [query, setQuery] = useState<EmployeeQuery>({
    s: '',
    employeeIds: [''],
  });
  const [employeeSearchValue1, setEmployeeSearchValue1] = useState<string[]>(['']);
  const [employeeSearchValue2, setEmployeeSearchValue2] = useState<string[]>(['']);

  const [
    employeeValueLine1,
    setEmployeeValueLine1,
  ] = useState<Array<{
    value: string,
    label: string,
  }>>(
    approvalLines && approvalLines.map((item) => {
      const {
        approvals = {
          value: '',
          label: '',
        },
      } = item;
      return {
        value: approvals.value || '',
        label: approvals.label || '',
      };
    }),
  );

  const [
    employeeValueLine2,
    setEmployeeValueLine2,
  ] = useState<Array<{
    value: string,
    label: string,
  }>>(
    approvalLines
      ? approvalLines.map((item) => {
        if (item.approvals) {
          return {
            value: item.approvals.value ? item.approvals.value : '',
            label: item.approvals.label ? item.approvals.label : '',
          };
        }
        return {
          value: '',
          label: '',
        };
      }) : [],
  );

  const addApprover = (line: number) => {
    if (line === 1) {
      const newArr = getValues('approvalLines') || [];
      setEmployeeValueLine1((prevState) => [
        ...prevState,
        {
          value: '',
          label: '',
        },
      ]);
      newArr.push({
        id: newArr.length + 1,
        approvals: {
          label: '',
          value: '',
        },
        employeeId: '',
        line: 1,
      });
      setValue('approvalLines', newArr);
    } else {
      const newArr = getValues('approvalLinesOptional') || [];
      setEmployeeValueLine2((prevState) => [
        ...prevState,
        {
          value: '',
          label: '',
        },
      ]);
      newArr.push({
        id: newArr.length + 1,
        approvals: {
          label: '',
          value: '',
        },
        employeeId: '',
        line: 2,
      });
      setValue('approvalLinesOptional', newArr);
    }
  };
  const getNonEmptyEmployeeIds = (): string[] => {
    const newArr: string[] = [];
    if (approvalLines) {
      approvalLines.forEach((item) => {
        if (item.employeeId) {
          newArr.push(item.employeeId.trim());
        }
      });
    }
    if (approvalLinesOptional) {
      approvalLinesOptional.forEach((item) => {
        if (item.employeeId) {
          newArr.push(item.employeeId.trim());
        }
      });
    }
    return newArr;
  };

  const {
    data: employeeApproverOption = [],
    refetch,
  } = useGetData<SelectItem[], SearchOptions>(
    ['employeeApproverData'],
    EMPLOYEE_SEARCH,
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
  const handleEmployeeSearchChange = (value: string, index: number, line: number) => {
    switch (line) {
      case 2: {
        setEmployeeSearchValue2((prevState) => {
          const newArr = [...prevState];
          newArr[index] = value;
          return newArr;
        });
        break;
      }
      default: {
        setEmployeeSearchValue1((prevState) => {
          const newArr = [...prevState];
          newArr[index] = value;
          return newArr;
        });
        break;
      }
    }
    if (line === 1) {
      setQuery({
        employeeIds: getNonEmptyEmployeeIds(),
        s: value,
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const onFocusSelect = () => {
    setQuery({
      s: '',
      employeeIds: [
        ...getNonEmptyEmployeeIds()],
    });
  };

  const onHandleChangeApprover = (i: number, changeValue: SelectItem, line: number) => {
    // const newForm = line === 1 ? getValues('approvalLines') : getValues('approvalLinesOptional');
    switch (line) {
      case 2: {
        const newForm = getValues('approvalLinesOptional');
        if (!changeValue) {
          if (
            newForm
          && newForm[i].employeeId
          ) {
            newForm[i].employeeId = '';
            setValue('approvalLinesOptional', newForm);
          }
          setEmployeeValueLine2((prevState) => {
            const newArray = [...prevState];
            newArray[i] = {
              value: '',
              label: '',
            };
            return newArray;
          });
        } else {
          setEmployeeValueLine2((prevState) => {
            const newArray = [...prevState];
            newArray[i] = {
              value: String(changeValue.value),
              label: changeValue.label,
            };
            return newArray;
          });
          newForm[i].employeeId = String(changeValue.value);
          setValue('approvalLinesOptional', newForm);
        }
        break;
      }
      default: {
        const newForm = getValues('approvalLines');
        if (!changeValue) {
          if (
            newForm
            && newForm[i].employeeId) {
            newForm[i].employeeId = '';
            setValue('approvalLines', newForm);
          }
          setEmployeeValueLine1((prevState) => {
            const newArray = [...prevState];
            newArray[i] = {
              value: '',
              label: '',
            };
            return newArray;
          });
        } else {
          setEmployeeValueLine1((prevState) => {
            const newArray = [...prevState];
            newArray[i] = {
              value: String(changeValue.value),
              label: changeValue.label,
            };
            return newArray;
          });
          newForm[i].employeeId = String(changeValue.value);
          setValue('approvalLines', newForm);
        }
        break;
      }
    }
  };

  const deleteApprover = (
    indexToRemove: number,
    valueToRemove: { value: string, label: string } | null | undefined,
    line: number,
  ) => {
    if (valueToRemove) {
      setQuery((prev) => ({
        s: '',
        employeeIds: prev.employeeIds.filter((employeeId) => employeeId !== valueToRemove.value),
      }));
    }
    switch (line) {
      case 2: {
        setEmployeeValueLine2((prevState) => {
          const newArray = [...prevState];
          newArray.splice(indexToRemove, 1);
          return newArray;
        });
        let newArr = getValues('approvalLinesOptional');
        if (newArr) {
          newArr = newArr.filter(
            (__, i) => i !== indexToRemove,
          );
          setValue('approvalLinesOptional', newArr);
        }
        break;
      }
      default: {
        setEmployeeValueLine1((prevState) => {
          const newArray = [...prevState];
          newArray.splice(indexToRemove, 1);
          return newArray;
        });
        let newArr = getValues('approvalLines');
        if (newArr) {
          newArr = newArr.filter(
            (__, i) => i !== indexToRemove,
          );
          setValue('approvalLines', newArr);
        }
        break;
      }
    }
  };
  return {
    control,
    approvalLines,
    approvalLinesOptional,
    employeeApproverOption,
    employeeSearchValue1,
    employeeSearchValue2,
    employeeValueLine1,
    employeeValueLine2,
    handleEmployeeSearchChange,
    addApprover,
    onFocusSelect,
    onHandleChangeApprover,
    deleteApprover,
  };
};

export default useApprovalLineForm;
