import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

import type levelFormSchema from './LevelList.schemas';

export interface Level extends AuditTrail {
  [key: string]: unknown;
  levelId: string;
  name: string;
  levelType: string;
  levelTypeId: string;
}

export type LevelList = PaginationData<Level>;

export interface LevelQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  posId: string;
  levId: string;
  s: string;
}

export interface LevelTableProps {
  levelTypeFilterOption: SelectItem[];
}

export type LevelFormSchema = z.infer<typeof levelFormSchema>;
