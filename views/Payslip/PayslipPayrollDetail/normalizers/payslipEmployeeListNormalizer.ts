import type { PayslipEmployeeData, PayslipEmployeeList } from '../PayslipPayrollDetail.types';

const payslipEmployeeListNormalizer = (data: PayslipEmployeeList): PayslipEmployeeList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): PayslipEmployeeData => ({
      employeeId: el.employeeId || '',
      employeeName: el.employeeName || '',
      employeeNumber: el.employeeNumber || '',
      fullname: el.fullname || '',
      organizationName: el.organizationName || '',
      position: el.position || 0,
      positionName: el.positionName || '',
      userId: el.userId || '',
      createdBy: el.createdBy || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default payslipEmployeeListNormalizer;
