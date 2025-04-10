"use client";

import React, { useState } from "react";
import { LockMoney } from "../../../components/LockMoney";
import { BalanceCardWrapper } from "../../../components/BalanceCardWrapper";

const page = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="w-full">
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
        </aside>
      </div>
    </div>
  );
};

export default page;
