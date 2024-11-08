'use client';

import Button from '@/components/base/Button';
import {
  IcDownlaod,
  IcEdit,
  IcImport,
  IcImportExact,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';

import PayrollDataImportModal from './components/PayrollDataImportModal';
import { TABLE_COLUMNS } from './EmployeeData.constants';
import useEmployeeData from './EmployeeData.hooks';

const EmployeeData = () => {
  const {
    employeeData,
    isExactImport,
    isLoading,
    openImportModal,
    queryParams,
    handleCloseImportModal,
    handleDownloadTemplate,
    handleEdit,
    handleOpenImportModal,
    handleOpenImportExactModal,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = useEmployeeData();
  return (
    <>
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
            disabledFn: (row) => row.isButtonDisable,
          },
        ]}
        onSearchChange={handleSearch}
        searchPlaceholder="Search by First Name"
        searchValue={queryParams.s}
        showPagination
        showSearch
        arrayColumnKey="items"
        arrayColumnUniqueKey="componentId"
        uniqueRowKey="employeeId"
        appendHeader={(
          <div className="flex justify-end gap-2">
            <Button
              color="primary"
              variant="text"
              startIcon={<IcDownlaod />}
              onClick={handleDownloadTemplate}
            >
              Download Template
            </Button>
            <Button
              color="primary"
              variant="outline"
              startIcon={<IcImport />}
              onClick={handleOpenImportModal}
            >
              Import
            </Button>
            <Button
              color="primary"
              startIcon={<IcImportExact />}
              onClick={handleOpenImportExactModal}
            >
              Import Exact
            </Button>
          </div>
        )}
      />
      {openImportModal && (
        <PayrollDataImportModal
          open={openImportModal}
          isExact={isExactImport}
          onClose={handleCloseImportModal}
        />
      )}
    </>
  );
};

export default EmployeeData;
