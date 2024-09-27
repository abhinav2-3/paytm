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
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleP2P = async () => {
    setLoading(true);
    const tnx = await p2pTransfer(number, Number(amount) * 100);
    if (tnx?.status !== 404) {
      toast.success("Money Transfered") && router.push("/transfer");
    } else {
      toast.error("Transfer Failed");
    }
    setNumber("");
    setAmount("");
    setLoading(false);
  };

  // const phoneNumber = searchParams.get("number");

  return (
    <div className="h-auto sm:h-[90vh]">
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
                loading={loading}
                // phoneNumber={phoneNumber}
                onClick={async () => {
                  await handleP2P();
                }}
              >
                {loading ? "Sending..." : "Send Money"}
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendCard;
