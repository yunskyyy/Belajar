import type {
  ReimburseSettingsFormSchema,
} from './ReimburseSettingsForm.types';

const INIT_SETTING: ReimburseSettingsFormSchema = {
  reimbursementCategoryId: '',
  reimbursementTypeId: '',
  effectiveDate: '',
  approvalLines: [
    {
      approvals: {
        value: '',
        label: '',
      },
      employeeId: '',
      line: 1,
    },
  ],
  approvalLinesOptional: [
    {
      approvals: {
        value: '',
        label: '',
      },
      employeeId: '',
      line: 2,
    },
  ],
  projects: [
    {
      project: {
        value: '',
        label: '',
      },
      budgetLimit: null,
      projectId: '',
      countToPerson: false,
    },
  ],
};

export default INIT_SETTING;
