import { format } from 'date-fns';

import type { OvertimeImportSummary } from '../OvertimeImportModal.types';

const overtimeSummaryNormalizer = (data: OvertimeImportSummary): OvertimeImportSummary => ({
  dataFailed: data.dataFailed.map((el) => ({
    id: crypto.randomUUID(),
    month: el.month || 0,
    year: el.year || 0,
    date: format(new Date(el.year, el.month - 1), 'dd MMMM yyyy'),
    employeeId: el.employeeId || '',
    employeeName: el.employeeName || '',
    teamCode: el.teamCode || '',
    totalHours: el.totalHours || 0,
    projectCode: el.projectCode || '',
  })),
  dataSuccess: data.dataSuccess.map((el) => ({
    id: crypto.randomUUID(),
    month: el.month || 0,
    year: el.year || 0,
    date: format(new Date(el.year, el.month - 1), 'dd MMMM yyyy'),
    employeeId: el.employeeId || '',
    employeeName: el.employeeName || '',
    teamCode: el.teamCode || '',
    totalHours: el.totalHours || 0,
    projectCode: el.projectCode || '',
  })),
});

export default overtimeSummaryNormalizer;
