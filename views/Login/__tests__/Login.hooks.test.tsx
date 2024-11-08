import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';

import {
  AUTHCONTEXT_MOCK,
  ROUTER_MOCK,
  TOASTER_MOCK,
} from '@/constants/mockProperty';
import { useAuthContext } from '@/contexts/AuthContext';
import useToaster from '@/hooks/useToaster';
import useLogin from '@/views/Login/Login.hooks';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useToaster');
jest.mock('@/contexts/AuthContext');

const useRouterMock = useRouter as jest.Mock;
const useToasterMock = useToaster as jest.Mock;
const useAuthContextMock = useAuthContext as jest.Mock;

const FORM_DATA_MOCK = {
  username: 'admin@radyalabs.com',
  password: '123123',
};
const queryClient = new QueryClient();
const wrapper = ({ children } : { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useLogin', () => {
  beforeAll(() => {
    useRouterMock.mockImplementation(() => ROUTER_MOCK);
    useToasterMock.mockImplementation(() => TOASTER_MOCK);
    useAuthContextMock.mockImplementation(() => AUTHCONTEXT_MOCK);
  });

  afterAll(() => {
    useRouterMock.mockClear();
    useToasterMock.mockClear();
    useAuthContextMock.mockClear();
  });

  it('should work calling onSubmit', async () => {
    const { result } = renderHook(
      () => useLogin(),
      { wrapper },
    );
    await waitFor(() => result.current.onSubmit(FORM_DATA_MOCK));
    expect(result.current.isSubmitting).toBe(true);
  });

  it('should work calling onGoogleSignIn', async () => {
    const { result } = renderHook(
      () => useLogin(),
      { wrapper },
    );
    await waitFor(() => result.current.onGoogleSignIn('token'));
    expect(result.current.isGoogleSigningIn).toBe(true);
  });

  it('should work calling togglePassword', async () => {
    const { result } = renderHook(
      () => useLogin(),
      { wrapper },
    );
    await waitFor(() => result.current.toggleShowPassword());
    expect(result.current.showPassword).toBe(true);
  });

  it('should work calling onAfterLogin', async () => {
    const { result } = renderHook(
      () => useLogin(),
      { wrapper },
    );
    await waitFor(() => result.current.onAfterLogin());
    expect(TOASTER_MOCK.success).toHaveBeenCalled();
    expect(ROUTER_MOCK.push).toHaveBeenCalled();
  });
});
