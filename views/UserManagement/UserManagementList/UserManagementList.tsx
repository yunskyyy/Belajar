'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import {
  IcAdd,
  IcEdit,
  IcEyeOpen,
  IcPesan,
  IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import type { User } from '@/types/user';

import { TABLE_COLUMNS } from './UserManagementList.constants';
import useUserManagementList from './UserManagementList.hooks';

const UserManagementList = () => {
  const {
    data,
    isLoading,
    queryParams,
    handleDelete,
    handleDetail,
    handleEdit,
    handleSendActivation,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useUserManagementList();

  return (
    <>
      <PageHeader
        title="List User Access Management"
        crumbs={[{ label: 'List User Access Management' }]}
        className="mb-6"
      >
        <Link href="/user-access-management/create">
          <Button
            className="h-fit"
            color="primary"
            startIcon={<IcAdd />}
          >
            Create User
          </Button>
        </Link>
      </PageHeader>
      <Paper className="p-4">
        <DataTable
          columns={TABLE_COLUMNS}
          data={(data && data.items) || []}
          loading={isLoading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchValue={queryParams.s}
          rowActions={[
            {
              color: 'primary',
              icon: <IcEyeOpen />,
              onClick: (row) => handleDetail(String(row.userId)),
              showFn: (row) => !!row.userOrganizationStatus,
              tooltip: 'View detail',
            },
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(String(row.userId)),
              tooltip: 'Edit data',
            },
            {
              color: 'default',
              icon: <IcPesan />,
              onClick: (row) => handleSendActivation(row),
              showFn: (row) => !row.userOrganizationStatus,
              tooltip: 'Resend activation e-mail',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row as User),
              tooltip: 'Delete data',
            },
          ]}
          searchPlaceholder="Search by Email or Fullname"
          showPagination
          uniqueRowKey="userId"
        />
      </Paper>
    </>
  );
};

export default UserManagementList;
