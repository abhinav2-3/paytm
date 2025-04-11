"use client";
import { Button } from "@repo/ui/button";

type FDItem = {
  id: number;
  name: string;
  startDate: string;
  maturityDate: string;
  amount: number;
  currentValue: number;
};

export const FDTable = ({
  data,
  onUnlock,
}: {
  data: FDItem[];
  onUnlock: (id: number) => void;
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="text-left text-sm text-gray-600 border-b border-gray-500">
            <th className="px-4 py-2">FD</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">Maturity Date</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Current Value</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fd) => (
            <tr
              key={fd.id}
              className="border-t text-gray-700 text-sm border-gray-300"
            >
              <td className="px-4 py-3 font-medium">{fd.name}</td>
              <td className="px-4 py-3">{fd.startDate}</td>
              <td className="px-4 py-3">{fd.maturityDate}</td>
              <td className="px-4 py-3">₹{fd.amount}</td>
              <td className="px-4 py-3">₹{fd.currentValue}</td>
              <td className="px-4 py-3">
                <Button onClick={() => onUnlock(fd.id)}>Unlock</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
