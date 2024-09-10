import { Card } from "@repo/ui/card";
import { formatPrice } from "../utils/FormatPrice";

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    type: string;
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
          <div
            className={`flex justify-between pt-2 ${t.type === "Sent" && "text-green-600"}`}
            key={i}
          >
            <div>
              <div className="text-sm font-semibold">{t.type} INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center text-right font-semibold">
              {t.type === "Sent" ? "-" : "+"} {formatPrice(t.amount / 100)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
