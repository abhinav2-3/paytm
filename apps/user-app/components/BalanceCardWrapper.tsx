"use client";

import { useEffect, useState } from "react";
import { BalanceCard } from "./BalanceCard";

export const BalanceCardWrapper = ({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) => {
  const [balance, setBalance] = useState({ amount: 0, locked: 0 });

  const fetchBalance = async () => {
    const res = await fetch("/api/balance");
    const data = await res.json();
    setBalance(data);
  };

  useEffect(() => {
    fetchBalance();
  }, [refreshTrigger]);

  return <BalanceCard amount={balance.amount} locked={balance.locked} />;
};
