import { useEffect, useState } from 'react';

import type { ChangeEvent, KeyboardEvent } from 'react';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { usePutData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { noop } from '@/utils';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';
import type { ComponentData } from '@/views/Payroll/types/runPayrollFormComponents';

import componentNormalizer from './normalizers/componentNormalizer';

const useModalEditComponent = (props: ModalEmployeeProps) => {
  const { onCloseModal = noop, id = '', componentData = [] } = props;
  const toaster = useToaster();
  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const {
    COMPONENT_SEARCH,
    COMPONENT_EDIT,
  } = DISBURSEMENT_MGMT;
  const [search, setSearch] = useState('');
  const [searchSelected, setSearchSelected] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryParams, setQueryParams] = useState({
    excludeIds: componentData.map((el) => el.key),
  });
  const [componentSelected, setComponentSelected] = useState<ComponentData[]>(componentData);

  const handleDeleteSelectedComponent = (component: ComponentData) => {
    const filtered = queryParams.excludeIds
      .filter((el) => el !== component.key);
    const filteredComponent = componentSelected.filter((el) => el.key !== component.key);
    setComponentSelected(filteredComponent);
    queryParams.excludeIds = filtered;
  };

  const onFilterChange = (value: Record<string, unknown>) => {
    setQueryParams({
      ...queryParams,
      ...value,
    });
  };

  const handleSelectComponent = (component: ComponentData) => {
    queryParams.excludeIds = [...queryParams.excludeIds, component.key];
    setComponentSelected((prevEmployeeSelected) => [...prevEmployeeSelected, component]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchSelected(e.target.value);
  };

  const submitSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilterChange({ s: String(search) });
    }
  };

  const submitSearchSelected = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchKeyword(searchSelected);
    }
  };

  const {
    data: dataComponent, isLoading: isLoadingComponent,
    refetch,
  } = useGetData(
    ['editComponent', queryParams.excludeIds.join(', ')],
    COMPONENT_SEARCH,
    {
      params: queryParams,
      normalizer: componentNormalizer,
    },
  );

  const {
    mutate: mutateSelectComponent,
    isLoading: isSubmitting,
  } = usePutData(
    ['saveEditComponent'],
    COMPONENT_EDIT(id),
    {
      options: {
        onSuccess: () => {
          onCloseModal();
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleEditComponent = () => {
    mutateSelectComponent(queryParams.excludeIds);
  };

  const handleAddAllComponent = () => {
    if (dataComponent) {
      setComponentSelected((prevState) => [...prevState, ...dataComponent.item]);
      queryParams.excludeIds = [
        ...queryParams.excludeIds,
        ...dataComponent.item.map((el) => el.key),
      ];
    }
  };

  const handleResetSelected = () => {
    setComponentSelected([]);
    queryParams.excludeIds = [];
  };

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  return {
    dataComponent,
    componentSelected,
    searchKeyword,
    searchSelected,
    handleAddAllComponent,
    handleDeleteSelectedComponent,
    handleEditComponent,
    handleResetSelected,
    handleSearch,
    handleSearchSelected,
    handleSelectComponent,
    submitSearch,
    isLoadingComponent,
    submitSearchSelected,
    isSubmitting,
  };
};

export default useModalEditComponent;
