import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Typography from '@/components/base/Typography';
import { IcChecklist } from '@/components/icons';
import { noop } from '@/utils';

import type { SuccessDialogProps } from './index.types';

const SuccessDialog = (props: SuccessDialogProps) => {
  const {
    content,
    open,
    title = '',
    onConfirm = noop,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onConfirm}
      classes={{ root: 'font-sans', paper: 'min-w-[300px] rounded-xl' }}
    >
      <DialogContent className="px-8 py-12">
        <div className="flex flex-col justify-between items-center gap-8">
          <div className="animate-bounce-twice w-32 h-32">
            <div className="flex justify-center items-center rounded-full w-32 h-32 bg-success-50 animate-ping-twice absolute" />
            <div className="flex justify-center items-center rounded-full w-32 h-32 bg-success-50 absolute">
              <div className="flex justify-center items-center w-24 h-24 absolute bg-success-100 rounded-full">
                <div className="bg-success-700 z-10 rounded-full h-20 w-20 flex justify-center items-center">
                  <IcChecklist className="w-10 h-10 fill-n-1 animate-spin-once" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-neutral-800 text-center">
            <Typography variant="headline" size="small" gutterBottom>{title}</Typography>
            <DialogContentText>
              {content}
            </DialogContentText>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessDialog;
