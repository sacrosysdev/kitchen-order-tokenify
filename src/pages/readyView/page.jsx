"use client";
import React, { useState } from "react";
import ReadyOrders from "./ReadyOrders";
import PreparingOrders from "./PreparingOrders";
import ThanksCard from "./ThanksCard";
import SuccessModal from "./SuccessModal"; // make sure the import name matches your file

const ReadyView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("123"); // replace this with your real order ID if available

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="p-8">
        <ReadyOrders />
        <PreparingOrders />
      </div>

      {/* ThanksCard section */}
      <div className="fixed bottom-0 w-full">
        <ThanksCard onOpenModal={handleOpenModal} />
      </div>

      {/* Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        orderId={orderId}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ReadyView;
