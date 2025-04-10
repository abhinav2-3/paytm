import { Card } from "@repo/ui/card";
import { formatPrice } from "../utils/FormatPrice";

export type OnRampTransactionType = {
  startTime: Date;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  provider: string;
};

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: string;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, i) => (
          <div className="flex justify-between pt-2" key={i}>
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">{t.time}</div>
              <div
                className={`text-xs ${t.status === "Success" ? "text-green-600" : t.status === "Failure" ? "text-red-600" : "text-slate-600"}`}
              >
                {t.status}
              </div>
            </div>
            <div className="flex flex-col justify-center items-end">
              <span className="font-semibold">
                {formatPrice(t.amount / 100)}
              </span>
              <span className="text-xs text-slate-600"> {t.provider}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
