export interface HolidayAllowanceData {
  newAmount: number;
  oldAmount: number;
  totalAmount: number;
  totalAmountString: string;
  percentageChange: number;
  items: HolidayAllowanceItem[];
  percentageString: string;
  isRising: boolean;
}

export interface HolidayAllowanceItem {
  year: number;
  totalAmount: number;
}
