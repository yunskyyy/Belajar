import Paper from '@/components/base/Paper';
import Description from '@/components/ui/Description';

import type { EmployeeDetailInfoProps } from './EmployeeDetailInfo.types';

const EmployeeDetailInfo = (props: EmployeeDetailInfoProps) => {
  const {
    employeeData,
    sectionData,
    sectionName,
  } = props;

  return (
    <Paper
      className="px-8 py-5"
      title={sectionName}
    >
      <div className="pt-6 flex justify-between mb-2 flex-wrap">
        {employeeData && sectionData.map((field) => (
          <Description
            key={field.key}
            size="large"
            label={field.label}
            value={String(employeeData[field.key])}
            layout="vertical"
            className={`mb-8 ${field.fullWidth ? 'w-full' : 'w-1/2'}`}
          />
        ))}
      </div>
    </Paper>
  );
};

export default EmployeeDetailInfo;
