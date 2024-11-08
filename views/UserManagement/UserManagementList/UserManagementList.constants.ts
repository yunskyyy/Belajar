import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';
import type { UserList } from '@/types/user';

import type { UserQueryParams } from './UserManagementList.types';

export const INIT_QUERY_PARAMS: UserQueryParams = {
  s: '',
  orderBy: '',
  orderType: '',
  fullname: '',
  username: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};
export const TABLE_COLUMNS: Array<TableColumn<keyof UserList>> = [
  {
    name: 'Email',
    dataKey: 'email',
    sortable: true,
    sortKey: 'Email',
  },
  {
    name: 'Fullname',
    dataKey: 'fullName',
    sortable: true,
    sortKey: 'FullName',
  },
  {
    name: 'Status',
    dataKey: 'userOrganizationStatus',
    sortable: false,
    dataType: 'status',
  },
];
