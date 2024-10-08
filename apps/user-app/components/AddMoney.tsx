"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "/transfer",
  },
  {
    name: "Axis Bank",
    redirectUrl: "/transfer",
  },
  {
    name: "State Bank of India",
    redirectUrl: "/transfer",
  },
  {
    name: "Union Bank of India",
    redirectUrl: "/transfer",
  },
];

export const AddMoney = () => {
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await createOnRampTransaction(provider, value);
              setValue(0);
              window.location.href = redirectUrl || "";
              setLoading(false);
            }}
          >
            {loading ? "Adding..." : "Add Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
