'use client';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import TextSkeleton from '@/components/base/TextSkeleton';
import { IcDownlaod } from '@/components/icons';
import Description from '@/components/ui/Description';
import { noop } from '@/utils';
import type { RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';

import DownloadSalaryModal from '../DownloadSalaryModal';

import useReview from './Review.hooks';

const Review = (props: RunPayrollComponentProps) => {
  const { onPrevStep = noop } = props;
  const {
    isEdit,
    dataRunPayroll,
    isLoading,
    isPayroll,
    openDownloadSalary,
    cutOffPeriod,
    cutOffPeriodLoading,
    handleCloseDownloadSalary,
    handleDownloadSalary,
    handleSave,
    handleDraft,
  } = useReview(props);

  const {
    description = '',
    paymentScheduleDate = '',
    payrollDisbursementId = '',
    holidayAllowanceDisbursementId = '',
    periodDate = '',
    totalAmount = '',
    totalEmployees = 0,
  } = dataRunPayroll || {};

  const {
    startDt: cutOffPeriodStartDt = '',
    endDt: cutOffPeriodEndDt = '',
    totalWorkDays: totalCutoffWeekdays = 0,
  } = cutOffPeriod || {};
  return (
    <>
      <Paper className="p-4">
        <div className="grid grid-cols-2 gap-5">
          {!isLoading && !cutOffPeriodLoading ? (
            <>
              <Description label={isPayroll ? 'Payroll Period' : 'THR Period'} value={`${periodDate}`} layout="vertical" />
              {isPayroll && (
                <Description
                  label="Cut Off Period"
                  value={`${cutOffPeriodStartDt} - ${cutOffPeriodEndDt} (${totalCutoffWeekdays} weekdays)`}
                  layout="vertical"
                />
              )}
              <Description label="Payment Schedule" value={`${paymentScheduleDate}`} layout="vertical" />
              <Description label="Employees" value={`${totalEmployees}`} layout="vertical" />
              <Description label="Description" className="col-start-1" value={`${description}`} layout="vertical" />
              <Description label="Amount" value={`${totalAmount}`} layout="vertical" />
            </>
          ) : (
            Array(6).fill(null).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="flex flex-col gap-2 w-1/2 mb-3" key={i}>
                <TextSkeleton width="lg" />
                <TextSkeleton width="xl" />
              </div>
            ))
          )}
          <div>
            <Button
              className="w-fit"
              color="primary"
              variant="outline"
              startIcon={<IcDownlaod />}
              onClick={handleDownloadSalary}
            >
              {`${isPayroll ? 'Salary' : 'THR'} Detail`}
            </Button>
          </div>
        </div>
      </Paper>
      <div className="flex mt-5 gap-3 justify-end">
        <Button
          variant="outline"
          color="primary"
          onClick={onPrevStep}
        >
          Previous
        </Button>
        {!isEdit && (
          <Button
            variant="outline"
            color="primary"
            onClick={handleDraft}
          >
            Save as Draft
          </Button>
        )}
        <Button
          color="primary"
          onClick={handleSave}
        >
          {isPayroll ? 'Save Run Payroll' : 'Save Run THR'}
        </Button>
      </div>

      <DownloadSalaryModal
        payrollDisbursementId={isPayroll ? payrollDisbursementId : holidayAllowanceDisbursementId}
        open={openDownloadSalary}
        onClose={handleCloseDownloadSalary}
      />
    </>
  );
};

export default Review;
