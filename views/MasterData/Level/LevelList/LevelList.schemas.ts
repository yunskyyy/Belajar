import { z } from 'zod';

const levelFormSchema = z.object({
  id: z.string(),
  name: z.string().nonempty({ message: 'Level is required' }),
  levelTypeId: z.string().nonempty({ message: 'Level Type is required' }),
  type: z.string().nonempty({ message: 'Level Type name is required' }),
});

export default levelFormSchema;
