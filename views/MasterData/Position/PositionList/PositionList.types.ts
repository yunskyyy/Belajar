import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

import type positionFormSchema from './PositionList.schemas';

export interface Position extends AuditTrail {
  [key: string]: unknown;
  positionId: string;
  name: string;
  divisionId: string;
  divisionName: string;
}

export type PositionList = PaginationData<Position>;

export interface PositionQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  divId: string;
  s: string;
}

export interface PositionTableProps {
  divisionFilterOption: SelectItem[];
}

export type PositionFormSchema = z.infer<typeof positionFormSchema>;
