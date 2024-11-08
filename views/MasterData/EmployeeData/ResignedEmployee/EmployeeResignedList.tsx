'use client';

import { IcHistore } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';

import EmployeeRestoreModal from './components/EmployeeRestoreModal';
import useEmployeeResignedList from './EmployeeResignedList.hooks';
import type { Employee } from './EmployeeResignedList.types';

const EmployeeResignedList = () => {
  const {
    employeeData,
    isLoading,
    tableColumns,
    queryParams,
    openRestoreModal,
    restoreEmployeeData,
    handleNavigateToDetail,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    handleCloseRestoreModal,
    handleOpenModalRestore,
  } = useEmployeeResignedList();
  const { firstName = '', employeeId = '' } = restoreEmployeeData || {};
  return (
    <>
      <DataTable
        columns={tableColumns}
        data={(employeeData && employeeData.items) || []}
        loading={isLoading}
        onClickDetail={(id) => handleNavigateToDetail(id)}
        onFilterChange={onFilterChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortChange={onSortChange}
        page={queryParams.page}
        pageSize={queryParams.size}
        searchValue={queryParams.s}
        onSearchChange={handleSearch}
        searchPlaceholder="Search by Employee Name"
        rowActions={[
          {
            color: 'default',
            icon: <IcHistore />,
            onClick: (row) => handleOpenModalRestore(row as Employee),
            tooltip: 'Restore',
          },
        ]}
        showCountTotal
        showPagination
        showSearch
        showAuditTrail={false}
        totalData={employeeData && employeeData.totalDataAfterFilter}
        uniqueRowKey="employeeId"
      />

      <EmployeeRestoreModal
        open={openRestoreModal}
        onClose={handleCloseRestoreModal}
        employeeName={firstName}
        employeeId={employeeId}
      />
    </>
  );
};

export default EmployeeResignedList;
