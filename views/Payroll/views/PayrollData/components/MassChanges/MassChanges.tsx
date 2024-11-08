'use client';

import Button from '@/components/base/Button';
import {
  IcEdit,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';

import { TABLE_COLUMNS } from './MassChanges.constants';
import useEmployeeData from './MassChanges.hooks';

const MassChanges = () => {
  const {
    employeeData,
    isLoading,
    queryParams,
    handleEdit,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = useEmployeeData();
  return (
    <DataTable
      columns={TABLE_COLUMNS}
      data={(employeeData && employeeData.items) || []}
      loading={isLoading}
      onFilterChange={onFilterChange}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onSortChange={onSortChange}
      page={queryParams.page}
      pageSize={queryParams.size}
      rowActions={[
        {
          color: 'success',
          icon: <IcEdit />,
          onClick: (row) => handleEdit(String(row.employeeId)),
          tooltip: 'Edit data',
        },
      ]}
      onSearchChange={handleSearch}
      searchPlaceholder="Search by Change ID"
      showPagination
      showSearch
      arrayColumnKey="items"
      arrayColumnUniqueKey="componentId"
      uniqueRowKey="employeeId"
      appendHeader={(
        <Button color="primary">
          Update Component
        </Button>
      )}
    />
  );
};

export default MassChanges;
