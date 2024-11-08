import { FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import Tabs from '@/components/base/Tabs';
import TextSkeleton from '@/components/base/TextSkeleton';
import Description from '@/components/ui/Description';
import Modal from '@/components/ui/Modal';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';

import AdditionalEarning from './components/AdditionalEarning/AdditionalEarning';
import ComponentAllowance from './components/ComponentAllowance/ComponentAllowance';
import ComponentBenefit from './components/ComponentBenefit/ComponentBenefit';
import ComponentSalary from './components/ComponentSalary/ComponentSalary';
import Deduction from './components/Deduction/Deduction';
import useModalEditEmployee from './ModalEditEmployee.hooks';
import type { DataEmployeeFormSchema } from './ModalEditEmployee.types';

const ModalEditEmployee = (props: ModalEmployeeProps) => {
  const { openModal, onCancel } = props;
  const {
    employeeData,
    employeeId,
    handleSubmit,
    isSubmitting,
    isLoading,
    methods,
    tabValue,
    handleChangeTab,
    onSubmit,
  } = useModalEditEmployee(props);

  const {
    additionalEarnings = [],
    componentsAllowance,
    componentsAllowancePrevious,
    componentsBenefit,
    componentsBenefitPrevious,
    componentsSalary,
    componentsSalaryPrevious,
    employeeName = '',
    employeeNumber = '',
  } = employeeData || {};

  return (
    <Modal
      open={openModal}
      title="Edit Run Payroll Data"
      onClose={onCancel}
      width={1068}
    >
      <Modal.Content>
        {(employeeData && !isLoading) ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
              <Description
                label="Employee ID"
                value={employeeNumber}
                layout="vertical"
              />
              <Description
                label="Employee Name"
                value={employeeName}
                layout="vertical"
              />
            </div>
            <FormProvider<DataEmployeeFormSchema> {...methods}>
              <Tabs
                labels={['Additional Earning', 'Deduction', 'Salary', 'Allowance', 'Benefit']}
                value={tabValue}
                onChange={handleChangeTab}
              >
                <Tabs.TabPanel index={0} value={tabValue}>
                  <AdditionalEarning data={additionalEarnings} />
                </Tabs.TabPanel>
                <Tabs.TabPanel index={1} value={tabValue}>
                  <Deduction />
                </Tabs.TabPanel>
                <Tabs.TabPanel index={2} value={tabValue}>
                  <ComponentSalary
                    employeeId={employeeId}
                    currentData={componentsSalary}
                    previousData={componentsSalaryPrevious}
                  />
                </Tabs.TabPanel>
                <Tabs.TabPanel index={3} value={tabValue}>
                  <ComponentAllowance
                    employeeId={employeeId}
                    currentData={componentsAllowance}
                    previousData={componentsAllowancePrevious}
                  />
                </Tabs.TabPanel>
                <Tabs.TabPanel index={4} value={tabValue}>
                  <ComponentBenefit
                    employeeId={employeeId}
                    currentData={componentsBenefit}
                    previousData={componentsBenefitPrevious}
                  />
                </Tabs.TabPanel>
              </Tabs>
            </FormProvider>

          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <TextSkeleton width="md" />
                <TextSkeleton width="xl" />
              </div>
              <div className="flex flex-col gap-2">
                <TextSkeleton width="md" />
                <TextSkeleton width="xl" />
              </div>
            </div>
            <div className="bg-gray-300 h-72 rounded-xl w-full animate-pulse" />
            <div className="bg-gray-300 h-10 w-48 rounded-xl animate-pulse" />
          </div>
        )}
      </Modal.Content>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            color="danger"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditEmployee;
