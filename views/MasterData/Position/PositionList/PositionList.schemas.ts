import { z } from 'zod';

const positionFormSchema = z.object({
  id: z.string(),
  divisionId: z.string().nonempty({ message: 'Division is required' }),
  name: z.string().nonempty({ message: 'Position is required' }),
});

export default positionFormSchema;
