export interface OvertimeFormModalProps {
  id?: string;
  open?: boolean;
  onClose?: (options?: { invalidate: boolean }) => void;
}
