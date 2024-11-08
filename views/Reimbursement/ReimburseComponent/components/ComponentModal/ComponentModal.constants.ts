import type {
  ComponentFormSchema,
} from './ComponentModal.types';

const defaultValueComponentForm: ComponentFormSchema = {
  name: '',
  types: [{
    reimbursementTypeId: '',
    name: '',
  }],
};

export default defaultValueComponentForm;
