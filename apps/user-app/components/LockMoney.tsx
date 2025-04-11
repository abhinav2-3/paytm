"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { DatePicker } from "@repo/ui/datepicker";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleError } from "../app/lib/Exception";
import { createLockedAmount } from "../app/lib/actions/lockAmount";
import { Select } from "@repo/ui/select";

export const LockMoney = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [lockDate, setLockDate] = useState("");
  const [pin, setPin] = useState(0);
  const [name, setName] = useState("");
  const [interestRate, setInterestRate] = useState(3);

  const handleLockMoney = async () => {
    if (value <= 0 || lockDate === "" || pin === 0 || name === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (pin.toString().length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }
    if (new Date(lockDate) < new Date()) {
      toast.error("Lock date must be in the future");
      return;
    }
    try {
      setLoading(true);
      const res = await createLockedAmount(
        value,
        new Date(lockDate),
        pin,
        name,
        interestRate
      );
      if (res.statusCode === 400) {
        toast.error(res.message);
        return;
      }
      if (res.statusCode === 401) {
        toast.error(res.message);
        return;
      }
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Money locked successfully");
    } catch (error) {
      toast.error("Failed to lock money");
      console.log(error);
      new handleError("Failed to lock money");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Lock Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <TextInput
          label={"Name"}
          placeholder={"Name"}
          onChange={(val) => {
            setName(val);
          }}
        />
        <DatePicker
          label="Lock Date"
          placeholder="Lock Date"
          onChange={(val) => {
            setLockDate(val);
          }}
        />
        <div className="flex justify-between">
          <TextInput
            label={"PIN"}
            placeholder={"4 Digit PIN"}
            onChange={(val) => {
              setPin(Number(val));
            }}
          />
          <div className="w-1/2 pt-3">
            <div className="text-left">Interest Rate</div>
            <Select
              onSelect={(val) => {
                setInterestRate(Number(val));
              }}
              options={[
                { key: "3", value: "3" },
                { key: "5", value: "5" },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <Button loading={loading} onClick={handleLockMoney}>
            {loading ? "Locking..." : "Lock Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
