import { useEffect, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type {
  ReimburseSettingsFormSchema,
} from '../../ReimburseSettingsForm.types';

import type {
  ProjectQuery,
} from './AmountLimitForm.type';

const useAmountLimitForm = () => {
  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_SETTINGS } = REIMBURSEMENT;
  const { PROJECT_SEARCH } = REIMBURSE_SETTINGS;

  const [query, setQuery] = useState<ProjectQuery>({
    s: '',
    categoryId: [''],
  });

  const {
    control,
    getValues,
    setValue,
  } = useFormContext<ReimburseSettingsFormSchema>();

  const { projects } = useWatch({ control });

  const [projectSearchValue, setProjectSearchValue] = useState<string[]>(['']);

  const [
    projectValue,
    setProjecValue,
  ] = useState<Array<{
    value: string,
    label: string,
  }>>(
    projects
      ? projects.map((item) => {
        if (item && item.project) {
          return {
            value: item.project.value ? item.project.value : '',
            label: item.project.label ? item.project.label : '',
          };
        }
        return {
          value: '',
          label: '',
        };
      }) : [],
  );

  const {
    data: projectOption = [],
    refetch,
  } = useGetData<SelectItem[], SearchOptions>(
    ['projectData'],
    PROJECT_SEARCH,
    {
      normalizer: selectOptionNormalizer,
      options: {
        enabled: false,
      },
      params: {
        s: query.s,
        categoryId: query.categoryId,
      },
    },
  );

  const getAllProjectIds = (): string[] => {
    const newArr: string[] = [];
    if (projects) {
      projects.forEach((item) => {
        if (item && item.projectId) {
          newArr.push(item.projectId.trim());
        }
      });
    }
    return newArr;
  };
  const handleProjectSearchChange = (value: string, index: number) => {
    setProjectSearchValue((prevState) => {
      const newArr = [...prevState];
      newArr[index] = value;
      return newArr;
    });
    setQuery({
      categoryId: getAllProjectIds(),
      s: value,
    });
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const addProject = () => {
    const newArr = getValues('projects') || [];
    setProjecValue((prevState) => [
      ...prevState,
      {
        value: '',
        label: '',
      },
    ]);
    newArr.push({
      projectId: '',
      project: {
        value: '',
        label: '',
      },
      budgetLimit: null,
      countToPerson: false,
    });
    setValue('projects', newArr);
  };
  const deleteProject = (
    indexToRemove: number,
    valueToRemove: string | null | undefined,
  ) => {
    if (valueToRemove) {
      setQuery((prev) => ({
        s: '',
        categoryId: prev.categoryId.filter((categoryId) => categoryId !== valueToRemove),
      }));
    }
    setProjecValue((prevState) => {
      const newArray = [...prevState];
      newArray.splice(indexToRemove, 1);
      return newArray;
    });
    let newArr = getValues('projects');
    if (newArr) {
      newArr = newArr.filter(
        (__, i) => i !== indexToRemove,
      );
      setValue('projects', newArr);
    }
  };

  const onFocusSelect = () => {
    setQuery({
      s: '',
      categoryId: [
        ...getAllProjectIds()],
    });
  };

  const onHandleChangeProject = (i: number, selectedValue: SelectItem) => {
    const changeValue = selectedValue as SelectItem;
    const newForm = getValues('projects');
    if (!changeValue) {
      setProjecValue((prevState) => {
        const newArray = [...prevState];
        newArray[i] = {
          value: '',
          label: '',
        };
        return newArray;
      });
      return;
    }
    setProjecValue((prevState) => {
      const newArray = [...prevState];
      newArray[i] = {
        value: String(changeValue.value),
        label: changeValue.label,
      };
      return newArray;
    });
    if (newForm && newForm[i]) {
      const newArr = newForm.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            projectId: String(changeValue.value),
            project: {
              value: String(changeValue.value),
              label: String(changeValue.label),
            },
          };
        }
        return item;
      });
      setValue('projects', newArr);
    }
  };

  return {
    projectOption,
    control,
    projects,
    projectValue,
    projectSearchValue,
    handleProjectSearchChange,
    deleteProject,
    addProject,
    onFocusSelect,
    onHandleChangeProject,
  };
};

export default useAmountLimitForm;
