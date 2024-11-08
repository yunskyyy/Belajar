import type { z } from 'zod';

import type dataEmployeeSchema from './ModalEmployee.schema';

export type DataEmployeeFormSchema = z.infer<typeof dataEmployeeSchema>;

export interface DataComponent {
  allowance : DetailComponent[]
  salary: DetailComponent[]
  benefit: DetailComponent[]
}

export interface ListEditComponent {
  id: string;
  employeeId: string;
  organizationName: string;
  employeeName: string;
  position: number;
  items : DataComponent;
  previousAmountItems: {
    allowance: PreviousItems[]
    benefit: PreviousItems[]
    salary: PreviousItems[]
  }

}

export interface ComponentThr {
  itemComponentId: string;
  exactAmount: number;
}

export interface DetailComponent {
  id: string;
  name: string;
  exactAmount: number;
  amount: number;
}

export interface PreviousItems {
  name: string;
  amount: string;
}

export interface ComponentProps {
  componentData: ListEditComponent;
  employeeId: string;
}
