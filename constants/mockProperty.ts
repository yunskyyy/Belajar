import type { User } from '@/types/user';

export const ROUTER_MOCK = {
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
};

export const TOASTER_MOCK = {
  default: jest.fn(),
  info: jest.fn(),
  success: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  show: jest.fn(),
  clear: () => jest.fn(),
};

const PROFILE_MOCK: User = {
  createdAt: '',
  createdBy: '',
  createdByFullName: '',
  email: '',
  fullName: '',
  lastPasswordChangeAt: '',
  lastUpdatedAt: '',
  lastUpdatedBy: '',
  lastUpdatedByFullName: '',
  scopes: [],
  userId: '',
  userOrganizationStatus: 0,
  username: '',
};

export const AUTHCONTEXT_MOCK = {
  isAuthenticated: true,
  profile: PROFILE_MOCK,
  token: '',
  getProfile: jest.fn(),
};
