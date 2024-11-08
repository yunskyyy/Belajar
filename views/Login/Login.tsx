'use client';

import Link from 'next/link';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcEyeOpen, IcEyesClose } from '@/components/icons';
import GoogleSSO from '@/components/ui/GoogleSSO';
import { APP_TITLE, GOOGLE_SSO_CLIENT_ID } from '@/constants/config';
import { noop } from '@/utils';

import useLogin from './Login.hooks';

const Login = () => {
  const {
    control,
    errors,
    handleSubmit,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onGoogleSignIn,
    onSubmit,
  } = useLogin();

  return (
    <section
      className="body-font font-sans overflow-hidden
      relative h-screen bg-n-1 w-full flex items-center justify-between"
    >
      <div className="flex justify-center items-center grow h-full">
        <div className="w-[400px]  flex flex-col gap-4">
          <Typography
            variant="headline"
            as="h1"
            size="large"
            className="text-center mb-2"
          >
            Log In to
            <br />
            {APP_TITLE}
          </Typography>
          <form
            className="w-full flex flex-col gap-8 mb-8"
            onSubmit={isSubmitting ? noop : handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  onChange={onChange}
                  inlineLabel="Email"
                  placeholder="Enter Email"
                  block
                  value={value}
                  ref={ref}
                  autoFocus
                  message={errors.username && errors.username.message}
                  error={!!errors.username}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  autoComplete="new-password"
                  onChange={onChange}
                  inlineLabel="Password"
                  block
                  value={value}
                  ref={ref}
                  message={errors.password && errors.password.message}
                  error={!!errors.password}
                  type={showPassword ? 'text' : 'password'}
                  appendObject={(
                    <Button
                      variant="text"
                      className="p-0 [&>*]:fill-n-7"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <IcEyeOpen /> : <IcEyesClose />}
                    </Button>
              )}
                />
              )}
            />
            <div className="flex justify-end">
              <Link href="/forgot-password">
                <Button variant="text" className="p-0 text-n-12">
                  Forgot Password?
                </Button>
              </Link>
            </div>
            <div className="flex justify-between items-center gap-2">
              <Button
                className="w-full p-4"
                color="primary"
                size="large"
                type="submit"
                loading={isSubmitting}
              >
                Log In
              </Button>
            </div>
          </form>
          <div className="h-0 flex justify-center items-center">
            {/* <div className="flex-1 border-0 border-solid border-t border-n-8" /> */}
            <Typography
              className="bg-n-1 px-0 text-n-8 font-normal"
              variant="title"
              as="span"
            >
              Or
            </Typography>
            {/* <div className="flex-1 border-0 border-solid border-t border-n-8" /> */}
          </div>
          <GoogleSSO
            clientId={GOOGLE_SSO_CLIENT_ID}
            callback={(credential) => onGoogleSignIn(credential.credential)}
            width={400}
            className="flex justify-center text-center mt-7"
            logo_alignment="center"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
