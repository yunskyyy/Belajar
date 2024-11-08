import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { type Range, utils, writeFile } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import { autofitColumns } from '@/helpers';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';
import payrollComponentListNormalizer from '@/views/Payroll/normalizers/payrollComponentListNormalizer';
import type { PayrollComponentList } from '@/views/Payroll/types/payrollComponent';

import employeeDataListNormalizer from './normalizers/employeeDataListNormalizer';
import { PAYROLL_TEMPLATE_COLUMNS } from './EmployeeData.constants';
import type { EmployeeDataResponse, PayrollSheetData } from './EmployeeData.types';

const useEmployeeData = () => {
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange: handleSearch,
    onSortChange,
  } = useQueryParams();

  const router = useRouter();
  const pathname = usePathname();

  const { PAYROLLS, PAYROLL_MGMT: { COMPONENTS } } = ENDPOINT;

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [isExactImport, setIsExactImport] = useState(false);

  const {
    data: employeeData,
    refetch: refetchEmployeeData,
    isLoading,
  } = useGetData<EmployeeDataResponse>(
    ['payrollEmployeeList', createQueryParams(queryParams)],
    PAYROLLS.EMPLOYEES,
    {
      params: queryParams,
      normalizer: employeeDataListNormalizer,
    },
  );

  const {
    refetch: fetchComponentData,
    isLoading: componentDataLoading,
  } = useGetData<PayrollComponentList>(
    ['componentList'],
    COMPONENTS,
    {
      params: {
        page: 1,
        size: 100,
        orderBy: 'TypeName',
      },
      normalizer: payrollComponentListNormalizer,
      options: {
        enabled: false,
      },
    },
  );

  const handleDownloadTemplate = () => {
    // get all payroll component first
    fetchComponentData().then((response) => {
      const { data } = response || {};
      const { items = [] } = data || {};
      const worksheet = utils.json_to_sheet([]);
      const workbook = utils.book_new();

      // map component type column name
      const typeNameCols = items.map((component) => component.typeName);
      const typeNameCounter: Record<string, number> = {};

      // count component type columns length
      typeNameCols.forEach((ele) => {
        if (typeNameCounter[ele]) {
          typeNameCounter[ele] += 1;
        } else {
          typeNameCounter[ele] = 1;
        }
      });

      const mergeArr: Range[] = []; // init column which are need to be merged later
      let lastColBefore = 3; // last column index after static column

      Object.keys(typeNameCounter).forEach((key, i) => {
        const currentLastCol = typeNameCounter[key] + lastColBefore;
        // mark start of a component type and end of component type to be merged
        mergeArr[i] = {
          s: { r: 0, c: lastColBefore + 1 }, // start col and row
          e: { r: 0, c: currentLastCol }, // end col and row
        };
        lastColBefore = currentLastCol;
      });

      const headerWithTypeName = [
        ...PAYROLL_TEMPLATE_COLUMNS,
        ...items.map((component) => component.typeName),
      ];

      const headerWithComponentName = [
        ...PAYROLL_TEMPLATE_COLUMNS,
        ...items.map((component) => component.name),
      ];

      // write document headers
      utils.sheet_add_aoa(worksheet, [
        headerWithTypeName, // first row with component type name cols
        headerWithComponentName, // second row with component name cols
      ], { origin: 'A1' });

      worksheet['!cols'] = autofitColumns<PayrollSheetData>([], headerWithComponentName);
      worksheet['!merges'] = [
        // hardcoded objects are static columns, merged two rows into one
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
        ...mergeArr,
      ];

      // create excel file
      utils.book_append_sheet(workbook, worksheet, 'Payroll Data');
      writeFile(workbook, 'Template Payroll Data Employee.xlsx', { compression: true });
    });
  };

  const handleEdit = (id: string) => {
    router.push(`${pathname}/edit/${id}`);
  };

  const handleCloseFormModal = (option?: { invalidate: boolean }) => {
    const { invalidate } = option || {};
    setOpenFormModal(false);
    if (invalidate) {
      refetchEmployeeData();
    }
  };

  const handleOpenImportModal = () => {
    setIsExactImport(false);
    setOpenImportModal(true);
  };

  const handleCloseImportModal = () => {
    setOpenImportModal(false);
    refetchEmployeeData();
  };

  const handleOpenImportExactModal = () => {
    setIsExactImport(true);
    setOpenImportModal(true);
  };

  return {
    componentDataLoading,
    employeeData,
    isExactImport,
    isLoading,
    openFormModal,
    openImportModal,
    queryParams,
    handleCloseFormModal,
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
  };
};

export default useEmployeeData;
