'use client';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import { IcHistore } from '@/components/icons';
import Description from '@/components/ui/Description';
import PageHeader from '@/components/ui/PageHeader';

import EmployeeRestoreModal from '../components/EmployeeRestoreModal';

import EmployeeDetailInfo from './components/EmployeeResignedDetailInfo';
import EmployeeDetailInfoSkeleton from './components/EmployeeResignedDetailInfoSkeleton';
import {
  EMPLOYEE_PROFILE_SECTIONS,
} from './EmployeeResignedDetail.constants';
import useEmployeeResignedDetail from './EmployeeResignedDetail.hooks';

const EmployeeResignedDetail = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    openRestoreModal,
    matchingOption,
    handleBack,
    handleCloseRestoreModal,
    handleOpenModalRestore,
  } = useEmployeeResignedDetail(id);

  const {
    firstName = '',
  } = data || {};
  return (
    <>
      <Paper className="mb-4">
        <PageHeader
          title="Detail Data Employee"
          crumbs={[
            { label: 'Master Data' },
            { label: 'Master Data Employee', href: '/master-data/employee-data/resigned' },
            { label: 'Detail Master Data Employee' },
          ]}
          showBackBtn
          onClickBackBtn={handleBack}
        >
          <Button
            startIcon={<IcHistore />}
            onClick={handleOpenModalRestore}
          >
            Restore Data
          </Button>
        </PageHeader>
      </Paper>
      <Paper>
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
                {data.approvalLines.map((approver, i) => (
                  <Paper
                    className="px-8 py-5"
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
            )
          ) : (
            EMPLOYEE_PROFILE_SECTIONS.map((section) => (
              <EmployeeDetailInfoSkeleton
                key={section.sectionName}
                fieldLength={section.fieldLength}
              />
            ))
          )}
        </div>
      </Paper>

      <EmployeeRestoreModal
        open={openRestoreModal}
        onClose={handleCloseRestoreModal}
        employeeName={firstName}
        employeeId={id}
        onSuccess={handleBack}
      />
    </>
  );
};

export default EmployeeResignedDetail;
