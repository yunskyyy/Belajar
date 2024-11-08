import { formatDate } from '@/utils';

import type { Employee, EmployeeList } from '../EmployeeResignedList.types';

const employeeResignedListNormalizer = (data: EmployeeList): EmployeeList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): Employee => ({
      employeeId: el.employeeId || '',
      employeeIdNumber: el.employeeIdNumber || '',
      firstName: el.firstName || '',
      lastName: el.lastName || '',
      fullname: el.fullname || `${el.firstName} ${el.lastName}` || '',
      divisionId: el.divisionId || '',
      divisionName: el.divisionName || '',
      levelId: el.levelId || '',
      levelName: el.levelName || '',
      emailAddress: el.emailAddress || '',
      employmentStatusId: el.employmentStatusId || '',
      employmentStatusName: el.employmentStatusName || '',
      position: el.position || 0,
      positionId: el.positionId || '',
      positionName: el.positionName || '',
      citizenIdNumber: el.citizenIdNumber || '',
      address: el.address || '',
      residentialAddress: el.residentialAddress || '',
      placeOfBirth: el.placeOfBirth || '',
      dateOfBirth: el.dateOfBirth || '',
      mobilePhone: el.mobilePhone || '',
      gender: el.gender || '',
      maritalStatus: el.maritalStatus || '',
      religion: el.religion || '',
      organizationId: el.organizationId || '',
      organizationName: el.organizationName || '',
      structuralId: el.structuralId || '',
      structuralName: el.structuralName || '',
      resignDate: el.resignDate ? formatDate(el.resignDate) : '',
      npwpNumber: el.npwpNumber || '',
      ptkpStatus: el.ptkpStatus || '',
      bankName: el.bankName || '',
      bankCode: el.bankCode || '',
      bankAccountNumber: el.bankAccountNumber || '',
      bankAccountHolderName: el.bankAccountHolderName || '',
      bpjsTkNumber: el.bpjsTkNumber || '',
      bpjsKesNumber: el.bpjsKesNumber || '',
      createdBy: el.createdBy || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? formatDate(el.createdAt) : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? formatDate(el.lastUpdatedAt) : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
    totalData: data.totalData || 0,
    totalDataAfterFilter: data.totalDataAfterFilter || 0,
  };
};

export default employeeResignedListNormalizer;
