import Paper from '@/components/base/Paper';
import TextSkeleton from '@/components/base/TextSkeleton';

import type { EmployeeDetailInfoSkeletonProps } from './EmployeeDetailInfoSkeleton.types';

const EmployeeDetailInfoSkeleton = (props: EmployeeDetailInfoSkeletonProps) => {
  const { fieldLength } = props;
  return (
    <Paper
      className="px-8 py-5 animate-pulse"
    >
      <TextSkeleton width="lg" className="mb-4" />
      <hr />
      <div className="pt-6 flex justify-between mb-2 flex-wrap">
        {[...Array(fieldLength)].map(() => (
          <div className="flex flex-col gap-2 [&>*]:rounded-xl mb-8 w-1/2">
            <TextSkeleton />
            <TextSkeleton width="xl" />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default EmployeeDetailInfoSkeleton;
