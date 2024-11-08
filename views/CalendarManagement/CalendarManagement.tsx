'use client';

import { useState } from 'react';

import { format } from 'date-fns';

import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import PageHeader from '@/components/ui/PageHeader';
import CalendarDates from '@/views/CalendarManagement/components/CalendarDates/CalendarDates';

const CalendarManagement = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = new Array(12).fill('').map((_el, i) => format(new Date(year, i), 'LLLL'));

  const handleChangeDate = (value: Date | null) => {
    if (value) {
      setYear(value.getFullYear());
      return;
    }
    setYear(new Date().getFullYear());
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Company Calendar"
        crumbs={[{ label: 'Company Calendar' }]}
      >
        <DatePicker views={['year']} className="w-32" onChange={handleChangeDate} value={new Date(year, 0, 1)} />
      </PageHeader>
      <Paper className="p-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {months.map((month, i) => (
            <table key={month} className="max-w-72">
              <thead>
                <tr>
                  <th colSpan={7} className="p-4">
                    <Typography variant="body" className="font-semibold">{`${month} ${year}`}</Typography>
                  </th>
                </tr>
                <tr className="[&>th]:font-medium [&>th]:text-sm [&>th]:pb-4">
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>
                <CalendarDates month={i} year={year} />
              </tbody>
            </table>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default CalendarManagement;
