export interface DetailRunThr {
  periodDate: string;
  paymentScheduleDate: string;
  totalEmployees: number;
  description: string;
}

export interface WidgetSummary {
  summary: Summary;
  total: number,
}

export interface Summary {
  salary: number,
  benefit: number,
  allowance: number,
}
