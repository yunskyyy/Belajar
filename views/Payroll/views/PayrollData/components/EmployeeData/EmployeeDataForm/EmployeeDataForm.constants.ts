import type { SelectItem } from '@/types/inputs';
import type { TableColumn } from '@/types/tables';

import type { EmployeeDataFormFilter, EmployeeDataFormTableProps } from './EmployeeDataForm.types';

export const FORM_TICKER_CONTENT = `
  <p class="mt-0">
    <b>Attention !!</b> <br/>
    Ikuti cara dibawah ini jika anda tidak mengerti langkah-langkah melakukan tambah data, \
    mengubah data, dan hapus data di edit payroll data
  </p>
  <p>
    <b>Bagaimana cara melakukan menambahkan data?</b> <br/> 
    Silahkan masukan data di bawah ini dengan benar. \
    Lalu klik tombol add component data untuk memasukan data ke table <b>Component Payroll data</b>. \
    Jika ingin menambahkan data lainnya, Silahkan masukan kembali data anda.
  </p>
  <p>
    <b>Bagaimana cara melakukan mengubah & menghapus data?</b> <br/>
    Silahkan ke bagian <b>Component Payroll data</b>, lalu dibagian action klik icon edit. \
    Selanjutnya akan muncul pop up edit data, edit data anda sesuai dengan kebutuhan anda. \
    JIka ingin menghapus silahkan klik icon hapus di bagian action.
  </p>
`;

export const PAYROLL_TYPE_OPTION: SelectItem[] = [
  {
    label: 'Adjustment',
    value: '0',
  },
  {
    label: 'Expired',
    value: '1',
  },
];

const emptyOption: SelectItem = {
  label: 'All',
  value: '',
};

export const PAYROLL_COMPONENT_STATUS: SelectItem[] = [
  emptyOption,
  {
    label: 'Active',
    value: 'true',
  },
  {
    label: 'Inactive',
    value: 'false',
  },
];

export const TABLE_COLUMNS = (params: EmployeeDataFormTableProps): TableColumn[] => {
  const {
    componentTypeFilterOption = [],
    componentNameFilterOption = [],
  } = params;
  return [
    {
      name: 'Type',
      dataKey: 'typeString',
      sortable: false,
      sticky: true,
      stickyPosition: 48,
      filterKey: 'type',
      filterOption: [emptyOption, ...PAYROLL_TYPE_OPTION],
    },
    {
      name: 'Effective Date',
      dataKey: 'effectiveDate',
      sortable: false,
    },
    {
      name: 'Component Type',
      dataKey: 'componentTypeName',
      filterKey: 'componentTypeId',
      filterOption: [emptyOption, ...componentTypeFilterOption],
      sortable: false,
    },
    {
      name: 'Component Name',
      dataKey: 'componentName',
      filterKey: 'componentId',
      filterOption: [emptyOption, ...componentNameFilterOption],
      sortable: false,
    },
    {
      name: 'Current Amount',
      dataKey: 'amount',
      sortable: false,
      width: 120,
    },
    {
      name: 'New Amount',
      dataKey: 'newAmount',
      sortable: false,
      width: 120,
    },
    {
      name: 'Status',
      dataKey: 'status',
      dataType: 'status',
      sortable: false,
      filterKey: 'status',
      filterOption: PAYROLL_COMPONENT_STATUS,
    },
  ];
};

export const INIT_FILTER: EmployeeDataFormFilter = {
  componentId: '',
  componentTypeId: '',
  type: '',
};
