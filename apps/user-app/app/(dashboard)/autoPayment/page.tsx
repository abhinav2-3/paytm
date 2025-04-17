import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Scheduled Payments
      </div>
      <div className="w-full text-left pl-4 flex flex-col gap-2">
        This feature is under development. You can schedule payments to be made
        at a later date. This feature is not yet available.
      </div>
      {/* <div className="w-full flex gap-4 items-center">
        <aside className="w-1/2">
          <LockMoney onSuccess={() => setRefreshKey((prev) => prev + 1)} />
        </aside>
        <aside className="w-1/2 mt-8">
          <BalanceCardWrapper refreshTrigger={refreshKey} />
          <div className="w-full text-left pl-4">
            <span className="text-sm text-gray-700">
              Penalty: 1% of the amount locked
              <br />
              Interest Rate: 3% per week
            </span>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              className="border border-gray-300 p-3 bg-green-500 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              href="/smartUnlock"
            >
              Unlock Money
            </Link>
          </div>
        </aside>
      </div> */}
    </div>
  );
};

export default page;
