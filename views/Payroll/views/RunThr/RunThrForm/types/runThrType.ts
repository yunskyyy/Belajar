export interface RunThrComponentProps {
  onNextStep?: (id:string) => void;
  onPrevStep?: () => void;
  id?: string;
  isEdit?: boolean;
}
