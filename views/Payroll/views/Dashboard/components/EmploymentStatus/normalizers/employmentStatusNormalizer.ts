import type { EmploymentStatusData, EmploymentStatusDataResponse } from '../EmploymentStatus.types';

const employmentStatusNormalizer = ({
  totalEmployee = 0,
  items: {
    Contract = 0,
    Resigned = 0,
    Internship = 0,
    Permanent = 0,
    Probation = 0,
  },
}: EmploymentStatusDataResponse): EmploymentStatusData => ({
  totalEmployee,
  items: {
    contract: Contract,
    resigned: Resigned,
    internship: Internship,
    permanent: Permanent,
    probation: Probation,
  },
});

export default employmentStatusNormalizer;
