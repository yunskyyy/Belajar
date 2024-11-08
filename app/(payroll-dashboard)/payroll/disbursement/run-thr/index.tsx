import Head from 'next/head';

import Layout from '@/components/layout/Layout';
import { APP_TITLE } from '@/constants/config';
import RunThr from '@/views/Payroll/views/RunThr/RunThrList';

const RunThrListPage = () => (
  <>
    <Head>
      <title>{`${APP_TITLE} - Run THR` }</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <RunThr />
    </Layout>
  </>
);

export default RunThrListPage;
