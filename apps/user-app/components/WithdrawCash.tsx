"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import React, { useRef, useState } from "react";
import { withdrawCash } from "../app/lib/actions/withdrawCash";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const WithdrawCash = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState<number | null>(null);
  const [redirect, setRedirect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  const playNotification = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.play();
    }
  };

  const withdrawHandler = async () => {
    setLoading(true);
    try {
      await withdrawCash(value, number);
      setRedirect(true);
      playNotification();
      toast.success("Check your Pocket 😉");
      setNumber(null);
      setValue(0);
      router.push("/transfer");
    } catch (error: any) {
      console.log(error);
      toast.error("Wrong Mobile Number");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <Card title="Withdraw Cash">
      <div>
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(val) => setValue(Number(val) * 100)}
        />
        <TextInput
          label="Number"
          placeholder="Mobile Number"
          onChange={(val) => setNumber(Number(val))}
        />
      </div>
      <div className="flex justify-center pt-4">
        <Button loading={loading} onClick={withdrawHandler}>
          {loading ? "Withdrawing..." : "Withdraw"}
        </Button>
        <audio src="/withdraw.mp3" ref={audioRef} />
      </div>
    </Card>
  );
};

export default WithdrawCash;
