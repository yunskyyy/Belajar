import type { OvertimeBulkRequest, OvertimeSheetData } from '../../../Overtime.types';

const overtimeSheetDataNormalizer = (data: OvertimeSheetData[] = []): OvertimeBulkRequest[] => (
  data.map((el): OvertimeBulkRequest => ({
    month: Number(el.Month) || 0,
    year: el.Year || 0,
    employeeId: el['Employee ID'] || '',
    projectCode: el['Project Code'] || '',
    teamCode: el['Team Name'] || '',
    totalHours: el['Overtime Hours'] || 0,
  }))
);

export default overtimeSheetDataNormalizer;
