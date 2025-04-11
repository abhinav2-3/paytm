"use client";

import React, { useState } from "react";
import { LockMoney } from "../../../components/LockMoney";
import { BalanceCardWrapper } from "../../../components/BalanceCardWrapper";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { FDTable } from "../../../components/FDTable";

const page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const dummyData = [
    {
      id: 1,
      name: "FD#1",
      startDate: "2025-04-01",
      maturityDate: "2025-06-01",
      amount: 1000,
      currentValue: 1060,
    },
    {
      id: 2,
      name: "FD#1",
      startDate: "2025-04-01",
      maturityDate: "2025-06-01",
      amount: 1000,
      currentValue: 1060,
    },
    {
      id: 3,
      name: "FD#1",
      startDate: "2025-04-01",
      maturityDate: "2025-06-01",
      amount: 1000,
      currentValue: 1060,
    },
    {
      id: 4,
      name: "FD#1",
      startDate: "2025-04-01",
      maturityDate: "2025-06-01",
      amount: 1000,
      currentValue: 1060,
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Smart Lock [FD]
      </div>
      <div className="w-full text-left pl-4 flex flex-col gap-2">
        <span className="text-sm text-gray-500">
          You can lock your money for a fixed period of time and earn a fixed
          interest rate. You can also unlock your money before the maturity date
          but you will be charged a penalty. Your default PIN is <b>0000</b>
        </span>
      </div>
      <div className="w-full flex gap-4 items-center">
        <aside className="w-1/2">
          <LockMoney onSuccess={() => setRefreshKey((prev) => prev + 1)} />
        </aside>
        <aside className="w-1/2">
          <BalanceCardWrapper refreshTrigger={refreshKey} />
          <div className="w-full text-left pl-4">
            <span className="text-sm text-gray-700">
              Penalty: 1% of the amount locked
              <br />
              Interest Rate: 3% per week
            </span>
          </div>
          {/* <div className="mt-8 flex justify-center">
            <Link
              className="border border-gray-300 p-3 bg-green-500 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              href="/smartUnlock"
            >
              Unlock Money
            </Link>
          </div> */}
        </aside>
      </div>
      <div className="w-full mt-8 items-center">
        <FDTable
          data={dummyData}
          onUnlock={() => {
            console.log(dummyData);
          }}
        />
      </div>
    </div>
  );
};

export default page;
