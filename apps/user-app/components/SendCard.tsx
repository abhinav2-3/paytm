"use client";
import React, { useState } from "react";
import { Center } from "@repo/ui/center";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              label="Number"
              placeholder="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              label="Amount"
              placeholder="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(number, Number(amount) * 100);
                  toast.success("Money Transfered");
                  router.push("/transfer");
                  setNumber("");
                  setAmount("");
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendCard;
