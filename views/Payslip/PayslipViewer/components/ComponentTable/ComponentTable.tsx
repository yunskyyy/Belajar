import { toIDR } from '@/utils';

import type { ComponentTableProps } from './ComponentTable.types';

const ComponentTable = (props: ComponentTableProps) => {
  const { data = [] } = props;
  const total = data.reduce((acc, cur) => acc + cur.amount, 0);
  return (
    <table className="w-full border-collapse mt-1 mb-4">
      <thead>
        <tr className="border border-solid border-x-0">
          <th className="w-12">No</th>
          <th>Deskripsi</th>
          {data[0]?.projectCode && (
            <th className="w-32">Project Code</th>
          )}
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="[&>tr>td]:text-base [&>tr>td]:py-1">
        { data.map((el, i) => (
          <tr>
            <td className="text-center">{i + 1}</td>
            {el?.projectCode ? (
              <>
                <td>{el.name}</td>
                <td className="flex justify-between">
                  <span>{el.projectCode}</span>
                  <span>:</span>
                </td>
              </>
            ) : (
              <td className="flex justify-between">
                <span>{el.name}</span>
                <span>:</span>
              </td>
            )}
            <td className="text-right">{toIDR(el.amount)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="text-right font-bold py-1"><u>{toIDR(total)}</u></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ComponentTable;
