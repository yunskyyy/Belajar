import Button from '@/components/base/Button';
import TextField from '@/components/base/Textfield';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';
import { IcSearch, IcX } from '@/components/icons';
import Modal from '@/components/ui/Modal';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';
import type { ComponentData } from '@/views/Payroll/types/runPayrollFormComponents';

import useModalEditComponent from './ModalEditComponent.hooks';

const ModalEditComponent = (props: ModalEmployeeProps) => {
  const { openModal = false, onCancel } = props;
  const {
    dataComponent,
    componentSelected,
    isLoadingComponent,
    searchKeyword,
    searchSelected,
    isSubmitting,
    handleAddAllComponent,
    handleDeleteSelectedComponent,
    handleEditComponent,
    handleResetSelected,
    handleSearch,
    handleSearchSelected,
    handleSelectComponent,
    submitSearch,
    submitSearchSelected,
  } = useModalEditComponent(props);

  const {
    total = 0,
    item = [],
  } = dataComponent || {};
  return (
    <Modal
      open={openModal}
      title="Edit Component"
      onClose={onCancel}
      width={1068}
    >
      <Modal.Content>
        <div className="grid grid-cols-2 gap-5">
          <div className="border-r border-0 border-solid pr-5 border-n-5">
            <div className="flex justify-between mb-3">
              <Typography variant="title">
                {`Total ${total} Component(s)`}
              </Typography>
              <Button variant="text" onClick={handleAddAllComponent}>Add All</Button>
            </div>
            <TextField
              classes={{ container: 'w-full' }}
              size="small"
              placeholder="Search Component"
              onChange={handleSearch}
              onKeyUp={submitSearch}
              prependObject={<IcSearch />}
            />
            <ul>
              {(!isLoadingComponent ? item.map((e:ComponentData) => (
                <li className="mb-3" key={e.key}>
                  <Button type="button" variant="text" onClick={() => handleSelectComponent(e)}>
                    <div className="flex flex-col justify-start">
                      <Typography variant="title" className="text-start">{`${e.value.split(';')[0]}`}</Typography>
                      <Typography variant="label" className="text-start text-grey-500">{`${e.value.split(';')[1]}`}</Typography>
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
                ))))}
            </ul>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <Typography variant="title">
                {componentSelected.length}
                {' '}
                Component(s) selected
              </Typography>
              <Button variant="text" onClick={handleResetSelected}>Reset All</Button>
            </div>
            <TextField
              classes={{ container: 'w-full' }}
              value={searchSelected}
              onChange={handleSearchSelected}
              onKeyUp={submitSearchSelected}
              size="small"
              placeholder="Search Component"
              prependObject={<IcSearch />}
            />
            <ul className="list-none">
              {(componentSelected.length
                ? componentSelected.filter(
                  (el) => el.value.toLowerCase().includes(
                    searchKeyword.toLowerCase(),
                  ),
                ).map((e:ComponentData) => (
                  <li className="mb-3" key={e.key}>
                    <Button type="button" variant="text" onClick={() => handleDeleteSelectedComponent(e)}>
                      <div className="flex gap-2">
                        <IcX className="fill-danger-300 mt-0.5" />
                        <div>
                          <Typography variant="title" className="text-start">{`${e.value.split(';')[0]}`}</Typography>
                          <Typography variant="label" className="text-start text-grey-500">{`${e.value.split(';')[1]}`}</Typography>
                        </div>
                      </div>
                    </Button>
                  </li>
                )) : ('')
              )}
            </ul>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            color="danger"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={handleEditComponent}
            loading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditComponent;
