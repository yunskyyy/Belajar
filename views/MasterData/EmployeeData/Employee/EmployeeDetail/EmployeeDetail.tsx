'use client';

import Paper from '@/components/base/Paper';
import Description from '@/components/ui/Description';
import PageHeader from '@/components/ui/PageHeader';

import EmployeeDetailInfo from './components/EmployeeDetailInfo';
import EmployeeDetailInfoSkeleton from './components/EmployeeDetailInfoSkeleton';
import {
  EMPLOYEE_PROFILE_SECTIONS,
} from './EmployeeDetail.constants';
import useEmployeeDetail from './EmployeeDetail.hooks';

const EmployeeDetail = ({ id }: { id: string }) => {
  const {
    data, isLoading, handleBack, matchingOption,
  } = useEmployeeDetail(id);
  return (
    <>
      <PageHeader
        title="Detail Data Employee"
        crumbs={[
          { label: 'Master Data' },
          { label: 'Master Data Employee', href: '/master-data/employee-data/employee' },
          { label: 'Detail Master Data Employee' },
        ]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
      <div className="flex flex-col gap-5">
        {!isLoading ? (
          data && (
            <div>
              {EMPLOYEE_PROFILE_SECTIONS.map((section) => (
                <EmployeeDetailInfo
                  key={section.sectionName}
                  employeeData={data}
                  sectionData={section.sectionData}
                  sectionName={section.sectionName}
                />
              ))}
              <Paper
                className="px-8 py-5"
                title="Approver Line"
              >
                <div className="pt-6 flex flex-col mb-2 flex-wrap">
                  {data.approvalLines.map((approver, i) => (
                    <Paper
                      className="px-2 py-5"
                      title={`Line ${i + 1}`}
                    >
                      <div className="pt-6 flex justify-between mb-2 flex-wrap">
                        {approver.employeeApprovals.map((employee, index) => (
                          <Description
                            key={employee.employeeIdNumber}
                            size="large"
                            layout="vertical"
                            label={`Approver ${index + 1}`}
                            value={`${employee.employeeIdNumber} - ${employee.employeeName}`}
                            className={`mb-8 ${(approver.employeeApprovals.length % 2 === 1 && index === approver.employeeApprovals.length - 1) ? 'w-full' : 'w-1/2'}`}
                          />
                        ))}
                      </div>
                      {i === 0 && (
                        <Description
                          key={approver.rule}
                          size="large"
                          layout="vertical"
                          label="Rule Approval"
                          value={matchingOption(String(approver.rule)) || 'Not Found'}
                          className="mb-8 w-1/2"
                        />
                      )}
                    </Paper>
                  ))}
                </div>
              </Paper>
            </div>
          )) : (
          EMPLOYEE_PROFILE_SECTIONS.map((section) => (
            <EmployeeDetailInfoSkeleton
              key={section.sectionName}
              fieldLength={section.fieldLength}
            />
          ))
        )}
      </div>
    </>
  );
};

export default EmployeeDetail;
