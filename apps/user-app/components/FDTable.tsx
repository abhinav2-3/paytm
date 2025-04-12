"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { UnlockerModal } from "./UnlockerModal";
import { formatPrice } from "../utils/FormatPrice";
import { FDItem } from "../types/types";

export const FDTable = ({
  data,
  onUnlock,
}: {
  data: FDItem[];
  onUnlock: (id: number, pin: number) => void;
}) => {
  const [selectedFD, setSelectedFD] = useState<FDItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (fd: FDItem) => {
    setSelectedFD(fd);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFD(null);
  };

  const handleConfirmUnlock = (pin: number) => {
    if (!selectedFD) return;
    onUnlock(selectedFD.id, pin);
    closeModal();
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-gray-500">
              <th className="px-4 py-2">FD</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Maturity Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Current Value</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((fd) => (
              <tr
                key={fd.id}
                className="border-t text-gray-700 text-sm border-gray-300"
              >
                <td className="px-4 py-3 font-medium">{fd.name}</td>
                <td className="px-4 py-3">{fd.startDate}</td>
                <td className="px-4 py-3">{fd.maturityDate}</td>
                <td className="px-4 py-3">{formatPrice(fd.amount)}</td>
                <td className="px-4 py-3">{formatPrice(fd.currentValue)}</td>
                <td className="px-4 py-3">
                  <Button onClick={() => openModal(fd)}>Unlockk</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFD && (
        <UnlockerModal
          isOpen={modalOpen}
          onClose={closeModal}
          data={selectedFD}
          onConfirmUnlock={handleConfirmUnlock}
        />
      )}
    </>
  );
};
