'use client';

import Paper from '@/components/base/Paper';
import Description from '@/components/ui/Description';
import PageHeader from '@/components/ui/PageHeader';
import { toIDR } from '@/utils';

import type { ApprovalLine, Project } from '../types/reimburseSettings';

import useReimburseSettingsDetail from './ReimburseSettingsDetail.hooks';
import type { ReimburseSettingsDetailProps } from './ReimburseSettingsDetail.type';

const ReimburseSettingsDetail = (props: ReimburseSettingsDetailProps) => {
  const {
    settingData,
    handleBack,
  } = useReimburseSettingsDetail(props);

  const {
    approvalLine1 = [],
    approvalLine2 = [],
    projects = [],
  } = settingData || {};

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="Detail Reimburse Settings"
          crumbs={[
            { label: 'Dashboard' },
            { label: 'Reimburse Settings' },
            { label: 'Detail Reimburse Settings' },
          ]}
          showBackBtn
          onClickBackBtn={handleBack}
        />
      </Paper>
      {settingData && (
        <>
          <Paper className="px-4 py-4">
            <div className="pt-6 flex justify-between mb-2 flex-wrap">
              <Description
                key={settingData.categoryId}
                size="large"
                layout="vertical"
                label="Category"
                value={settingData.categoryName}
                className="mb-8 w-1/2"
              />
              <Description
                key={settingData.typeId}
                size="large"
                layout="vertical"
                label="Type"
                value={settingData.typeName}
                className="mb-8 w-1/2"
              />
              <Description
                key={settingData.effectiveDate}
                size="large"
                layout="vertical"
                label="Effective Date"
                value={settingData.effectiveDate}
                className="w-1/2"
              />
            </div>
          </Paper>
          <Paper
            className="px-4 py-4 my-8"
            title="Approver Line"
          >
            <div className="pt-6 flex flex-col mb-2 flex-wrap">
              <Paper
                className="px-2 py-5"
                title="Line 1"
              >
                <div className="pt-6 flex justify-between mb-2 flex-wrap">
                  {approvalLine1.map((employee: ApprovalLine, index: number) => (
                    <Description
                      key={employee.employeeIdNumber}
                      size="large"
                      layout="vertical"
                      label={`Approver ${index + 1}`}
                      value={`${employee.employeeIdNumber} - ${employee.employeeName}`}
                      className={`mb-8 ${(approvalLine1.length % 2 === 1 && index === approvalLine1.length - 1) ? 'w-full' : 'w-1/2'}`}
                    />
                  ))}
                </div>
              </Paper>
              <Paper
                className="px-2 py-5"
                title="Line 2"
              >
                <div className="pt-6 flex justify-between mb-2 flex-wrap">
                  {approvalLine2.length > 0 ? (
                    approvalLine2.map((employee: ApprovalLine, index: number) => (
                      <Description
                        key={employee.employeeIdNumber}
                        size="large"
                        layout="vertical"
                        label={`Approver ${index + 1}`}
                        value={`${employee.employeeIdNumber} - ${employee.employeeName}`}
                        className={`mb-8 ${(approvalLine1.length % 2 === 1 && index === approvalLine1.length - 1) ? 'w-full' : 'w-1/2'}`}
                      />
                    ))
                  )
                    : (
                      <Description
                        size="large"
                        layout="vertical"
                        label="Approver"
                        value="-"
                        className="mb-8 w-1/2"
                      />
                    )}
                </div>
              </Paper>
            </div>
          </Paper>
          <Paper
            title="Amount Limit"
            className="px-4 py-4"
          >
            <div className="pt-6 flex flex-col mb-2 flex-wrap">
              {projects.map((project: Project) => (
                <div className="pt-6 flex justify-between mb-2 flex-wrap">
                  <Description
                    key={project.projectId}
                    size="large"
                    layout="vertical"
                    label="Project Code"
                    value={project.projectCode}
                    className="mb-8 w-1/2"
                  />
                  <Description
                    key={project.budgateLimit}
                    size="large"
                    layout="vertical"
                    label="Project Code"
                    value={toIDR(project.budgateLimit)}
                    className="mb-8 w-1/2"
                  />
                  <Description
                    key={String(project.countToPerson)}
                    size="large"
                    layout="vertical"
                    label="Calculate to Person"
                    value={project.countToPerson ? 'Yes' : 'No'}
                    className="mb-8 w-full"
                  />
                </div>
              ))}
            </div>
          </Paper>
        </>
      )}
    </>
  );
};

export default ReimburseSettingsDetail;
