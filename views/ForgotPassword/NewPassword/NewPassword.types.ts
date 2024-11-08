export interface NewPasswordProps {
  code?: string;
  type?: NewPasswordType;
}

export type NewPasswordType = 'admin-reset-password' | 'reset-password' | 'activation';

export type NewPasswordUrlLookup = NewPasswordType extends never
  ? never : { [K in NewPasswordType]: string };
