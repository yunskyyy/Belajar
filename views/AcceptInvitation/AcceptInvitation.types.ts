export interface AcceptInvitationProps {
  code?: string;
}

export interface InvitationStatus {
  isValid: boolean;
  message: string;
  statusActivation: number;
}
