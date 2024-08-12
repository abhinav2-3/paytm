"use client";
import React, { useState } from "react";
import { Center } from "@repo/ui/center";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
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
              <Button onClick={() => {}}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendCard;
