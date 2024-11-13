import React from "react";
import SendCard from "./SendCard";
import { User } from "./Users";

const SendMoneyCard = ({ user }: any) => {
  console.log(user);
  return (
    <div className="bg-black/20 grid place-items-center absolute top-0 w-full">
      <div>
        <SendCard user={user} />
      </div>
    </div>
  );
};

export default SendMoneyCard;
