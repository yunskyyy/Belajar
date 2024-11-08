'use client';

import Image from 'next/image';

import logo from '@/assets/brand_primary.png';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import Description from '@/components/ui/Description';
import PageHeader from '@/components/ui/PageHeader';
import { toIDR } from '@/utils';

import ComponentTable from './components/ComponentTable';
import usePayslipViewer from './PayslipViewer.hooks';
import type { PayslipViewerProps } from './PayslipViewer.types';

const PayslipViewer = (props: PayslipViewerProps) => {
  const { id: payslipId } = props;
  const { isLoading, payslipData } = usePayslipViewer(props);

  const {
    employee: {
      employeeName = '',
      employeeIdNumber = '',
      divisionName = '',
      employmentStatusName = '',
      latestNpwpNumber = '',
      levelName = '',
      npwpNumber = '',
      positionName = '',
      ptkpStatus = '',
      structuralName = '',
    } = {},
    organization: {
      addressOrganization = '',
      organizationName = '',
    } = {},
    componentsAdditionalEarnings = [],
    componentsAllowance = [],
    componentsBenefit = [],
    componentsSalary = [],
    deductions = [],
  } = payslipData || {};

  return (
    <div className="flex flex-col gap-4">
      <Paper className="p-4">
        <PageHeader
          title="Payslip Payroll"
          crumbs={[
            { label: 'Payroll' },
            { label: 'Payslip' },
            { label: 'Payslip Payroll', href: '/payroll/payslip/payslip-payroll' },
            { label: 'Detail Payslip Payroll', href: `/payroll/payslip/payslip-payroll/${payslipId}` },
            { label: 'Payslip Viewer' },
          ]}
        />
      </Paper>
      <Paper className="p-4">
        {!isLoading && payslipData ? (
          <div className="w-3/4 mx-auto my-2 p-8 border border-solid border-n-6 drop-shadow min-h-[960px]">
            <div className="flex justify-between">
              <Image src={logo} alt="" style={{ width: '25%', height: 'auto', objectFit: 'contain' }} />
              <div className="flex flex-col gap-1 text-right max-w-96">
                <Typography variant="body" className="text-danger-500 font-bold italic">
                  CONFIDENTIAL DOCUMENT
                </Typography>
                <Typography variant="title" className="font-bold uppercase">
                  {organizationName}
                </Typography>
                <Typography variant="label">
                  {addressOrganization}
                </Typography>
              </div>
            </div>
            <div className="py-3 my-3 border border-solid border-x-0 flex flex-col gap-1 text-center [&>*]:font-semibold">
              <Typography variant="title">PAYSLIP</Typography>
              <Typography>{`Periode ${payslipData.period}`}</Typography>
              <Typography>{`Payment: ${payslipData.payment}`}</Typography>
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              <Description label="Employee ID / Name" value={`${employeeIdNumber} / ${employeeName}`} sameColorLabel />
              <Description label="Level" value={levelName} sameColorLabel />
              <Description label="Position" value={positionName} sameColorLabel />
              <Description label="Status" value={employmentStatusName} sameColorLabel />
              <Description label="Division" value={divisionName} sameColorLabel />
              <Description label="PTKP" value={ptkpStatus} sameColorLabel />
              <Description label="Structural Title" value={structuralName} sameColorLabel />
              <Description label="NPWP" value={latestNpwpNumber || npwpNumber} sameColorLabel />
            </div>
            <div className="flex justify-end gap-3 my-8">
              <Typography variant="title" className="underline">TAKE HOME PAY</Typography>
              <Typography variant="title">{toIDR(payslipData.paymentTotal)}</Typography>
            </div>
            {(!!componentsSalary.length || !!componentsAllowance.length) && (
              <>
                <Typography variant="title">Earnings</Typography>
                <ComponentTable data={[...componentsSalary, ...componentsAllowance]} />
              </>
            )}
            {!!deductions.length && (
              <>
                <Typography variant="title">Deductions</Typography>
                <ComponentTable data={deductions} />
              </>
            )}
            {!!componentsBenefit.length && (
              <>
                <Typography variant="title">Benefits</Typography>
                <ComponentTable data={componentsBenefit} />
              </>
            )}
            {!!componentsAdditionalEarnings.length && (
              <>
                <Typography variant="title">Additional Earnings</Typography>
                <ComponentTable data={componentsAdditionalEarnings} />
              </>
            )}
          </div>
        ) : (
          <div className="w-3/4 mx-auto my-2 p-8 drop-shadow min-h-[600px] bg-n-5 animate-pulse" />
        )}
      </Paper>
    </div>
  );
};

export default PayslipViewer;
