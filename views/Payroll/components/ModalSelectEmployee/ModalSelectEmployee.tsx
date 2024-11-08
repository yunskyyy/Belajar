import Button from '@/components/base/Button';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';
import { IcSearch, IcX } from '@/components/icons';
import Accordion from '@/components/ui/Accordion';
import Modal from '@/components/ui/Modal';
import type { EmployeeData } from '@/views/Payroll/types/runPayrollFormComponents';

import type { ModalEmployeeProps } from '../../types/modalEmployee';

import useModalSelectEmployee from './ModalSelectEmployee.hooks';

const ModalSelectEmployee = (props: ModalEmployeeProps) => {
  const { openModal = false } = props;
  const {
    divisionOption,
    employeeLoading,
    employeeSearch,
    employeeSearchData,
    employeeSearchLoading,
    employeeSelected,
    isSubmitting,
    structuralOption,
    positionOption,
    queryParams,
    handleAddAllEmployee,
    handleCloseModal,
    handleDeleteSelectedEmployee,
    handleFilterChange,
    handleResetSelected,
    handleSaveSelectEmployees,
    handleSearch,
    handleSelectEmployee,
    handleSearchSelected,
    submitSearch,
    submitSearchSelected,
  } = useModalSelectEmployee(props);

  const {
    listData = [],
    total = 0,
  } = employeeSearchData || {};

  return (
    <Modal
      open={openModal}
      title="Select Employee"
      onClose={handleCloseModal}
      width={1068}
    >
      <Modal.Content>
        <div className="grid grid-cols-2 gap-5">
          <div className="border-r border-0 border-solid pr-5 border-[#C9C9C9]">
            <div className="flex justify-between mb-3">
              <Typography variant="title">
                {` View ${listData.length} of ${total} Employee(s)`}
              </Typography>
              <Button color="primary" variant="text" onClick={handleAddAllEmployee}>Add All</Button>
            </div>
            <Accordion label="Filter">
              <div className="flex flex-col gap-3">
                <Select
                  label="Division"
                  clearable
                  options={divisionOption}
                  value={String(queryParams.divisionId)}
                  onChange={(e) => handleFilterChange('divisionId', String(e.target.value))}
                  classes={{ container: 'w-full' }}
                  placeholder="Select Division"
                  labelLayout="vertical"

                />
                <Select
                  label="Position"
                  clearable
                  options={positionOption}
                  value={String(queryParams.positionId)}
                  onChange={(e) => handleFilterChange('positionId', String(e.target.value))}
                  classes={{ container: 'w-full' }}
                  placeholder="Select Position"
                  labelLayout="vertical"
                />
                <Select
                  label="Structural Position"
                  clearable
                  options={structuralOption}
                  value={String(queryParams.structuralId)}
                  onChange={(e) => handleFilterChange('structuralId', String(e.target.value))}
                  classes={{ container: 'w-full' }}
                  placeholder="Select Structural Position"
                  labelLayout="vertical"
                />
              </div>
            </Accordion>
            <TextField
              classes={{ container: 'w-full mt-3' }}
              size="small"
              placeholder="Search Employee Name"
              onChange={handleSearch}
              onKeyUp={submitSearch}
              prependObject={<IcSearch />}
            />
            <ul>
              {!employeeSearchLoading ? listData.map((e: EmployeeData) => (
                <li className="mb-3" key={e.employeeId}>
                  <Button type="button" variant="text" onClick={() => handleSelectEmployee(e)}>
                    <div className="flex flex-col justify-start">
                      <Typography variant="title" className="text-start">
                        {`${e.employeeName}`}
                      </Typography>
                      <Typography
                        variant="label"
                        className="text-start text-n-6"
                      >
                        {`${e.employeeNumber} - ${e.positionName}`}
                      </Typography>
                    </div>
                  </Button>
                </li>
              )) : (
                Array(8).fill(null).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className="my-8 list-none" key={i}>
                    <div className="flex flex-col gap-2 justify-start">
                      <TextSkeleton width="lg" />
                      <TextSkeleton width="xl" />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <Typography variant="title">
                {`${employeeSelected.length} Employee(s) selected`}
              </Typography>
              <Button color="primary" variant="text" onClick={handleResetSelected}>Reset All</Button>
            </div>
            <TextField
              classes={{ container: 'w-full' }}
              size="small"
              onChange={handleSearchSelected}
              onKeyUp={submitSearchSelected}
              placeholder="Search Employee Name"
              prependObject={<IcSearch />}
            />
            {!employeeLoading ? (
              <ul className="list-none">
                {(employeeSearch.length !== 0 ? employeeSearch.map((e: EmployeeData) => (
                  <li className="mb-3" key={e.employeeId}>
                    <Button type="button" variant="text" onClick={() => handleDeleteSelectedEmployee(e)}>
                      <div className="flex gap-2">
                        <IcX className="fill-danger-300 mt-0.5" />
                        <div>
                          <Typography variant="title" className="text-start">{`${e.employeeName}`}</Typography>
                          <Typography variant="label" className="text-start text-n-6">{`${e.employeeNumber} - ${e.positionName}`}</Typography>
                        </div>
                      </div>
                    </Button>
                  </li>
                )) : (
                  <div className="h-96 flex items-center px-8">
                    <Typography
                      size="large"
                      variant="body"
                      className="text-center text-n-6"
                    >
                      Please select employee(s) first by clicking their name on the left panel.
                      Minimum of 5 employee data!
                    </Typography>
                  </div>
                ))}
              </ul>
            ) : (
              Array(8).fill(null).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="my-8 list-none" key={i}>
                  <div className="flex flex-col gap-2 justify-start">
                    <TextSkeleton width="lg" />
                    <TextSkeleton width="xl" />
                  </div>
                </li>
              ))
            )}
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            color="danger"
            variant="outline"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="button"
            loading={isSubmitting}
            onClick={handleSaveSelectEmployees}
            disabled={Boolean(employeeSelected.length < 5)}
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSelectEmployee;
