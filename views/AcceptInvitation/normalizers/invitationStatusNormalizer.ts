import type { InvitationStatus } from '../AcceptInvitation.types';

const invitationStatusNormalizer = (data: InvitationStatus): InvitationStatus => ({
  isValid: data.isValid || false,
  statusActivation: data.statusActivation || 0,
  message: data.message || '',
});

export default invitationStatusNormalizer;
