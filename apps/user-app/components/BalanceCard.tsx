import { Card } from "@repo/ui/card";
import { formatPrice } from "../utils/FormatPrice";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>{formatPrice(amount)}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Locked Balance</div>
        <div>{formatPrice(locked)}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{formatPrice(amount + locked)}</div>
      </div>
    </Card>
  );
};
