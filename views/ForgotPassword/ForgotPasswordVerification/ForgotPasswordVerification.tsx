'use client';

import React from 'react';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';

import useForgotPasswordVerification from './ForgotPasswordVerification.hooks';
import type { ForgotPasswordVerificationProps } from './ForgotPasswordVerification.types';

const ForgotPasswordVerification = (props: ForgotPasswordVerificationProps) => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
  } = useForgotPasswordVerification(props);

  return (
    <div className="w-[400px]">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Typography variant="headline" size="large" gutterBottom className="mb-1">
            Forgot Password Verification
          </Typography>
          <Typography variant="title" size="small" className="font-normal">
            Please enter the code that was sent by us to your email
          </Typography>
        </div>
        <Controller
          control={control}
          name="code"
          defaultValue=""
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <TextField
              onChange={({ target: { value: inputValue = '' } }) => onChange(inputValue.toUpperCase())}
              inlineLabel="Verification Code"
              block
              autoFocus
              value={value}
              ref={ref}
              message={error && error.message}
              error={!!error}
              maxLength={6}
            />
          )}
        />
        <div>
          <Button
            className="w-full"
            color="primary"
            size="large"
            type="submit"
            loading={isSubmitting}
          >
            Verify
          </Button>
          <Typography variant="body" className="text-danger-500 mt-4" align="center">
            Your verification code will expire in 1 hour
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordVerification;
