export interface EmploymentStatusData {
  totalEmployee: number;
  items: EmploymentStatusDetail;
}

export interface EmploymentStatusDetail {
  permanent: number;
  contract: number;
  internship: number;
  probation: number;
  resigned: number;
}

export interface EmploymentStatusDataResponse {
  totalEmployee: number;
  items: EmploymentStatusDetailResponse;
}

export interface EmploymentStatusDetailResponse {
  Permanent: number;
  Contract: number;
  Internship: number;
  Probation: number;
  Resigned: number;
}
