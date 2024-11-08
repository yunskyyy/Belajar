import { render, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { noop } from '@/utils';
import Login from '@/views/Login';
import useLogin from '@/views/Login/Login.hooks';

const { result } = renderHook(() => useForm());

const useLoginMock = useLogin as jest.Mock;

const USELOGIN_MOCK = {
  control: result.current.control,
  errors: result.current.formState.errors,
  handleSubmit: noop,
  isSubmitting: false,
  showPassword: false,
  toggleShowPassword: noop,
  onGoogleSignIn: noop,
  onSubmit: noop,
};

jest.mock('@/views/Login/Login.hooks');
jest.mock('@/components/base/Button', () => () => <div>Button</div>);
describe('Login', () => {
  beforeAll(() => {
    useLoginMock.mockImplementation(() => USELOGIN_MOCK);
  });

  it('should render correctly', () => {
    expect(render(<Login />)).toBeDefined();
  });
});
