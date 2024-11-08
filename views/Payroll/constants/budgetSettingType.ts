import BudgetSettingData from '@/enums/budgetSettingType';

const budgetSettingTypeTypeValues = Object.keys(BudgetSettingData).filter((v) => (
  !Number.isNaN(Number(v))
));

// eslint-disable-next-line import/prefer-default-export
export const BUDGET_SETTING_TYPES = budgetSettingTypeTypeValues.map((val) => ({
  label: BudgetSettingData[Number(val)],
  value: val,
}));
