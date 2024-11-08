'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

import logo from '@/assets/brand_light.svg';
import authBG from '@/assets/forgot-password-bg.svg';
import loginBG from '@/assets/login-bg.svg';

const Index = (props: { children: ReactNode }) => {
  const { children } = props;
  const pathname = usePathname();
  return (
    <section className="body-font font-sans overflow-hidden
      relative h-screen bg-n-1 w-full flex items-center justify-between"
    >
      <div
        className="bg-primary-800 w-[300px] h-full"
      >
        <Image
          src={logo}
          alt="Brand Logo"
          className="w-40 h-auto object-contain absolute mx-11 mt-11"
          priority
        />
        <Image
          src={(pathname || '').includes('login') ? loginBG : authBG}
          alt=""
          className="h-auto w-full mx-auto"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex justify-center items-center grow h-full">
        {children}
      </div>
    </section>
  );
};

export default Index;
