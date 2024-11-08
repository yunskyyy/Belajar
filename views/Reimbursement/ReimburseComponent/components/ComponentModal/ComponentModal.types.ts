import type { z } from 'zod';

import type componentSchema
  from './ComponentModal.schema';

export interface ComponentModalProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  componentId?: string;
}

export type ComponentFormSchema = z.infer<typeof componentSchema>;
