'use client';

import React from 'react';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcArrowBack } from '@/components/icons';
import useForgotPassword from '@/views/ForgotPassword/ForgotPassword.hooks';

const ForgotPassword = () => {
  const {
    control,
    errors,
    handleSubmit,
    isSubmitting,
    handleBack,
    onSubmit,
  } = useForgotPassword();

  return (
    <div className="w-[400px]">
      <Button
        rounded
        className="p-2.5 bg-n-1 drop-shadow-lg mb-2.5"
        onClick={handleBack}
      >
        <IcArrowBack />
      </Button>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <Typography
              variant="headline"
              size="large"
              gutterBottom
              className="mb-1"
            >
              Forgot Password?
            </Typography>
            <Typography variant="title" size="small" className="font-normal">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </Typography>
            <Typography variant="title" size="small" className="font-normal">
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </Typography>
          </div>
        </div>
        <Controller
          control={control}
          name="emailAddress"
          defaultValue=""
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              onChange={onChange}
              inlineLabel="Enter Your Email"
              block
              autoFocus
              value={value}
              ref={ref}
              message={errors.emailAddress && errors.emailAddress.message}
              error={!!errors.emailAddress}
            />
          )}
        />
        <Button
          className="w-full"
          color="primary"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
