import { FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import Tabs from '@/components/base/Tabs';
import TextSkeleton from '@/components/base/TextSkeleton';
import Description from '@/components/ui/Description';
import Modal from '@/components/ui/Modal';
import { camelCaseToTitleCase } from '@/utils';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';

import { THR_COMPONENT_TYPE } from '../../EmployeeDataForm.constants';

import Allowance from './components/Allowance/Allowance';
import Benefit from './components/Benefit/Benefit';
import Salary from './components/Salary/Salary';
import useModalEmployee from './ModalEmployee.hooks';
import type { DataEmployeeFormSchema } from './ModalEmployee.types';

const ModalEmployee = (props: ModalEmployeeProps) => {
  const { openModal, onCloseModal, employeeId = '' } = props;
  const {
    handleChangeTab,
    tabValue,
    methods,
    handleSubmit,
    onSubmit,
    componentData,
    isLoading,
    isSubmitting,

  } = useModalEmployee(props);

  const {
    employeeName = '',
  } = componentData || {};

  return (
    <Modal
      open={openModal}
      title="Edit THR Data"
      onClose={onCloseModal}
      width={1068}
    >
      <Modal.Content>
        {(componentData && !isLoading) ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
              <Description
                label="Employee ID"
                value={componentData.employeeId}
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
                labels={Object.keys(componentData.items).map((el) => camelCaseToTitleCase(el))}
                value={tabValue}
                onChange={handleChangeTab}
              >
                {Object.keys(componentData.items).map((el, i) => {
                  if (camelCaseToTitleCase(el) === THR_COMPONENT_TYPE.BENEFIT) {
                    return (
                      <Tabs.TabPanel key={el} index={i} value={tabValue}>
                        <Benefit
                          componentData={componentData}
                          employeeId={employeeId}
                        />
                      </Tabs.TabPanel>
                    );
                  }
                  if (camelCaseToTitleCase(el) === THR_COMPONENT_TYPE.ALLOWANCE) {
                    return (
                      <Tabs.TabPanel key={el} index={i} value={tabValue}>
                        <Allowance
                          componentData={componentData}
                          employeeId={employeeId}
                        />
                      </Tabs.TabPanel>
                    );
                  }
                  if (camelCaseToTitleCase(el) === THR_COMPONENT_TYPE.SALARY) {
                    return (
                      <Tabs.TabPanel key={el} index={i} value={tabValue}>
                        <Salary
                          componentData={componentData}
                          employeeId={employeeId}
                        />
                      </Tabs.TabPanel>
                    );
                  }
                  return null;
                })}
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
            onClick={onCloseModal}
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

export default ModalEmployee;
