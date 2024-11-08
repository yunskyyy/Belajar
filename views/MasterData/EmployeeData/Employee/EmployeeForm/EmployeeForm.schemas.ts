import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

import { PHONE_REGEX } from './EmployeeForm.constants';

const { REQUIRED } = FIELD_MESSAGE;

const approvalLineSchema = z.object({
  id: z.number().optional(),
  employeeApprovalLineId: z.string().optional(),
  rule: z.number().optional(),
  approvals: z.array(z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }, { required_error: REQUIRED('Approver') }).refine(
    (approval) => approval.label !== '' && approval.value !== '',
    { message: REQUIRED('Approver') },
  )),
  employeeApprovals: z.array(z.string().refine((val) => val !== '', {
    message: REQUIRED('Approver'),
  })),
});

const employeeFormSchema = z.object({
  userId: z.string().optional(),
  employeeIdNumber: z.string().optional(),
  firstName: z.string().nonempty({ message: REQUIRED('First Name') }),
  lastName: z.string().optional(),
  emailAddress: z.string().nonempty({ message: REQUIRED('Email') }).email({ message: 'Invalid email format' }),
  citizenIdCardNumber: z.string()
    .length(
      16,
      { message: `${REQUIRED('Citizen ID')} and must be exactly 16 characters` },
    )
    .nonempty(),
  citizenAddress: z.string().nonempty({ message: REQUIRED('Citizen Address') }),
  residentialAddress: z.string().nonempty({ message: REQUIRED('Residential Address') }),
  placeOfBirth: z.string().nonempty({ message: REQUIRED('Place of Birth') }),
  dateOfBirth: z.string().nonempty({ message: REQUIRED('Date of Birth') }),
  mobilePhone: z.string()
    .nonempty({ message: REQUIRED('Mobile Phone') })
    .regex(PHONE_REGEX, { message: 'Invalid mobile phone format' })
    .min(8)
    .max(13),
  gender: z.string().nonempty({ message: REQUIRED('Gender') }),
  maritalStatus: z.string().nonempty({ message: REQUIRED('Marital Status') }),
  religion: z.string().nonempty({ message: REQUIRED('Religion') }),
  organizationId: z.string().optional(),
  divisionId: z.string().nonempty({ message: REQUIRED('Division') }),
  positionId: z.string().nonempty({ message: REQUIRED('Position') }),
  structuralId: z.string().nonempty({ message: REQUIRED('Structural/Specialist Title') }),
  levelId: z.string().nonempty({ message: REQUIRED('Level') }),
  employmentStatusId: z.string().nonempty({ message: REQUIRED('Employment Status') }),
  joinDate: z.string().min(1, { message: REQUIRED('Join Date') }),
  signDate: z.string().nullable(),
  endDate: z.string().nullable(),
  npwp: z.string().nonempty({ message: REQUIRED('NPWP') }),
  latestNpwp: z.union([
    z.string().regex(/^\d{16}$/, { message: `${REQUIRED('NPWP (16 Digit)')} must be either empty or a string containing exactly 16 digits.` }),
    z.string().length(0),
  ]).nullable(),
  ptkpStatus: z.string().nonempty({ message: REQUIRED('PTKP Status') }),
  bankAccountNumber: z.string().nonempty({ message: REQUIRED('Bank Account') }),
  bankCode: z.string().nonempty({ message: REQUIRED('Bank Name') }),
  bankAccountHolderName: z.string().nonempty({ message: REQUIRED('Bank Account Holder') }),
  bpjsTkId: z.string()
    .length(
      11,
      { message: `${REQUIRED('ID BPJS Ketenagakerjaan')} and must be exactly 11 characters` },
    )
    .nonempty(),
  bpjsKesId: z.string()
    .length(
      13,
      { message: `${REQUIRED('ID BPJS Kesehatan')} and must be exactly 13 characters` },
    )
    .nonempty(),
  approvalLines: z.array(approvalLineSchema),
  approvalLinesOptional: z.object({
    id: z.number().optional(),
    rule: z.number().optional(),
    employeeApprovalLineId: z.string().optional(),
    approvals: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).nullable(),
    employeeApprovals: z.array(z.string()).nullable(),
  }),
});

export default employeeFormSchema;
