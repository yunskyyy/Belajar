'use client';

import React from 'react';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcEyeOpen, IcEyesClose } from '@/components/icons';

import useNewPassword from './NewPassword.hooks';
import type { NewPasswordProps } from './NewPassword.types';

const NewPassword = (props: NewPasswordProps) => {
  const {
    buttonTitle,
    control,
    handleSubmit,
    isSubmitting,
    showPassword,
    onSubmit,
    toggleShowPassword,
  } = useNewPassword(props);

  const [showNewPassword, showConfirmationPassword] = showPassword;

  return (
    <div className="w-[400px]">
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Typography variant="headline" size="large" gutterBottom className="mb-1">
            New Password
          </Typography>
          <Typography variant="title" size="small" className="font-normal">
            Enter your new password below.
            When creating a password, use uppercase, lowercase and number.
          </Typography>
        </div>
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              inlineLabel="New Password"
              block
              autoFocus
              value={value}
              ref={ref}
              message={error ? error.message : 'Use a combination of uppercase "AA" , lowercase "aa", number "123"'}
              error={!!error}
              type={showNewPassword ? 'text' : 'password'}
              appendObject={(
                <Button variant="text" className="p-0 [&>*]:fill-n-7" onClick={() => toggleShowPassword(0)}>
                  {showNewPassword ? <IcEyeOpen /> : <IcEyesClose />}
                </Button>
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmationPassword"
          defaultValue=""
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              inlineLabel="Confirmation Password"
              block
              autoFocus
              value={value}
              ref={ref}
              message={error && error.message}
              error={!!error}
              type={showConfirmationPassword ? 'text' : 'password'}
              appendObject={(
                <Button variant="text" className="p-0 [&>*]:fill-n-7" onClick={() => toggleShowPassword(1)}>
                  {showConfirmationPassword ? <IcEyeOpen /> : <IcEyesClose />}
                </Button>
              )}
            />
          )}
        />
        <Button
          className="w-full"
          color="primary"
          size="large"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {buttonTitle}
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
