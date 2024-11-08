export interface OvertimeData {
  totalAmount: number;
  totalAmountString: string;
  items: OvertimeItem[];
}

export interface OvertimeItem {
  projectCode: string;
  totalAmount: number;
}

export interface OnsiteIncentiveData {
  totalAmount: number;
  totalAmountString: string;
  items: OnsiteIncentiveItem[];
}

export interface OnsiteIncentiveItem {
  projectCode: string;
  totalAmount: number;
  types: OnsiteIncentiveTypes;
}

export interface OnsiteIncentiveTypes {
  incentive?: number;
  onsite?: number;
}
