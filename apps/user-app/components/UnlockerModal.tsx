"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { formatPrice } from "../utils/FormatPrice";

type FDItem = {
  id: number;
  name: string;
  amount: number;
  currentValue: number;
  startDate: string;
  maturityDate: string;
  interestRate: number;
};

export const UnlockerModal = ({
  isOpen,
  onClose,
  data,
  onConfirmUnlock,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: FDItem;
  onConfirmUnlock: (pin: number, penality: boolean) => void;
}) => {
  const [pin, setPin] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [penality, setpenality] = useState(false);

  const [day, month, year] = data.maturityDate.split("/").map(Number);
  // Create a valid Date object
  const validMaturityDate = new Date(
    year ?? 0,
    (month ?? 1) - 1, // month - 1 because JS months are 0-indexed
    day ?? 1
  );

  useEffect(() => {
    const isEarlyUnlock = validMaturityDate.getTime() > new Date().getTime();
    setpenality(isEarlyUnlock);
  }, []);

  const handleUnlock = () => {
    if (!pin || pin.length !== 4) {
      setError("Enter a valid 4-digit PIN");
      return;
    }

    if (penality && !confirmed) {
      setConfirmed(true);
      return;
    }

    onConfirmUnlock(Number(pin), penality);
    setPin("");
    setConfirmed(false);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-xl font-bold text-[#6a51a6]">
                  {data.name}
                </DialogTitle>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Start Date: </strong>
                    {new Date(data.startDate).toDateString()}
                  </p>
                  <p>
                    <strong>Maturity Date: </strong>
                    {validMaturityDate.toDateString()}
                  </p>
                  <p>
                    <strong>Amount: </strong>
                    {formatPrice(data.amount)}
                  </p>
                  <p>
                    <strong>Current Value: </strong>
                    {formatPrice(data.currentValue)}
                  </p>
                  <p>
                    <strong>Interest Rate: </strong> {data.interestRate}%
                  </p>
                </div>

                {penality && !confirmed && (
                  <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md text-sm">
                    ⚠️ Unlocking before maturity will charge 1% penalty. Click
                    unlock again to confirm.
                  </div>
                )}

                <div className="mt-4">
                  <TextInput
                    label="PIN"
                    placeholder="Enter 4-digit PIN"
                    value={pin}
                    onChange={(val) => {
                      setPin(String(val));
                    }}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      setConfirmed(false);
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUnlock}>
                    {penality && !confirmed ? "Continue Unlock" : "Unlock"}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
