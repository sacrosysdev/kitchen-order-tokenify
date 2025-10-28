import React, { useEffect, useRef, useState } from "react";

const SuccessModal = ({ isOpen, orderId, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) setShowModal(true);
    else {
      const timer = setTimeout(() => setShowModal(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 🟢 Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-xl p-8 text-center flex flex-col justify-center items-center transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-4"
        } 
        w-[350px] h-[350px]`}
      >
        <h1 className="text-[6rem] font-extrabold text-[#3ABC4F] leading-none">
          #{orderId}
        </h1>

        <p className="mt-6 text-gray-700 text-lg font-semibold text-center">
          Hi! Your order is ready. <br /> Come pick it up!
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
