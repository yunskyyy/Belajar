'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Select from '@/components/base/Select';
import Ticker from '@/components/base/Ticker';
import Typography from '@/components/base/Typography';
import {
  IcAdd,
  IcEdit,
  IcResign,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';

import type { Employee } from '../types/employee';

import EmployeeResignModal from './components/EmployeeResignModal';
import ImportDataEmployeeModal from './components/ImportDataEmployeeModal';
import usePositionList from './EmployeeList.hooks';

const EmployeeList = () => {
  const {
    divisionFilterOption,
    employeeData,
    exportLoading,
    exportQuery,
    levelFilterOption,
    isLoading,
    openExportModal,
    positionFilterOption,
    statusFilterOption,
    structuralFilterOption,
    tableColumns,
    queryParams,
    openImportModal,
    resignEmployee,
    openResignModal,
    handleCloseExportModal,
    handleResign,
    handleEdit,
    handleExport,
    handleExportFilterChange,
    handleNavigateToDetail,
    handleOpenExport,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    handleCloseImportModal,
    handleCloseResignModal,
  } = usePositionList();

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
        rowActions={[
          {
            color: 'success',
            icon: <IcEdit />,
            onClick: (row) => handleEdit(String(row.employeeId)),
            tooltip: 'Edit data',
          },
          {
            color: 'danger',
            icon: <IcResign />,
            onClick: (row) => handleResign(row as Employee),
            tooltip: 'Resign Employee',
          },
        ]}
        onSearchChange={handleSearch}
        searchPlaceholder="Search by Employee Name"
        showCountTotal
        showPagination
        showSearch
        totalData={employeeData && employeeData.totalDataAfterFilter}
        uniqueRowKey="employeeId"
        appendHeader={(
          <div className="flex gap-2 justify-center">
            <Button variant="outline" color="primary" onClick={handleOpenExport}>
              Export Data
            </Button>
            <Link href="/master-data/employee-data/employee/create">
              <Button
                className="h-fit"
                color="primary"
                startIcon={<IcAdd className="fill-n-1" />}
              >
                Create Data Employee
              </Button>
            </Link>
          </div>
        )}
      />
      <Modal
        open={openExportModal}
        title="Export Data Employee"
        onClose={handleCloseExportModal}
        width={400}
      >
        <Modal.Content>
          <Typography variant="title" className="mb-3">Filter</Typography>
          <Ticker text="Filter dibawah ini sudah mengikuti filter yang sudah di atur didalam list.
           Jika ingin merubahnya silahkan pilih sesuai data yang anda inginkan!"
          />
          <div className="flex flex-col gap-4 mt-6 [&>div>label]:text-left">
            <Select
              value={String(exportQuery.divisionId)}
              onChange={(e) => handleExportFilterChange('divisionId', String(e.target.value))}
              placeholder="All"
              options={divisionFilterOption}
              label="Division"
              labelLayout="horizontal"
              block
            />
            <Select
              value={String(exportQuery.positionId)}
              onChange={(e) => handleExportFilterChange('positionId', String(e.target.value))}
              placeholder="All"
              options={positionFilterOption}
              label="Position"
              labelLayout="horizontal"
              block
            />
            <Select
              value={String(exportQuery.structuralId)}
              onChange={(e) => handleExportFilterChange('structuralId', String(e.target.value))}
              placeholder="All"
              options={structuralFilterOption}
              label="Structural Title"
              labelLayout="horizontal"
              block
            />
            <Select
              value={String(exportQuery.levelId)}
              onChange={(e) => handleExportFilterChange('levelId', String(e.target.value))}
              placeholder="All"
              options={levelFilterOption}
              label="Level"
              labelLayout="horizontal"
              block
            />
            <Select
              value={String(exportQuery.employmentStatusId)}
              onChange={(e) => handleExportFilterChange('employmentStatusId', String(e.target.value))}
              placeholder="All"
              options={statusFilterOption}
              label="EmploymentStatus"
              labelLayout="horizontal"
              block
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-between gap-2 w-full [&>*]:w-full">
            <Button
              variant="outline"
              color="danger"
              onClick={handleCloseExportModal}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              color="primary"
              loading={exportLoading}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <ImportDataEmployeeModal
        open={openImportModal}
        onClose={handleCloseImportModal}
      />

      <EmployeeResignModal
        open={openResignModal}
        employee={resignEmployee}
        onClose={handleCloseResignModal}
      />
    </>
  );
};

export default EmployeeList;
