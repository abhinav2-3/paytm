"use client";
import React, { useRef, useState } from "react";
import { Center } from "@repo/ui/center";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

const SendCard = ({
  number,
  closeModel,
}: {
  number?: string | null;
  closeModel?: any;
}) => {
  const [phoneNumber, setPhoneNumber] = useState(number);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playNotification = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.play();
    }
  };

  const handleP2P = async () => {
    setLoading(true);
    if (!phoneNumber) {
      return;
    }
    try {
      const tnx = await p2pTransfer(phoneNumber, Number(amount) * 100);
      if (tnx.success) {
        playNotification();
        toast.success("Money Transfered");
        setPhoneNumber("");
        setAmount("");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        closeModel(false);
      }, 1500);
    }
  };

  return (
    <div className="h-auto sm:h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              label="Number"
              placeholder="Number"
              value={number!}
              onChange={(value) => setPhoneNumber(value)}
            />
            <TextInput
              label="Amount"
              placeholder="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button loading={loading} onClick={handleP2P}>
                {loading ? "Sending..." : "Send Money"}
              </Button>
              <audio src="/success.mp3" ref={audioRef} />
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendCard;
