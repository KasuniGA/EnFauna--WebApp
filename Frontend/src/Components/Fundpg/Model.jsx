import React from "react";
import { X } from "lucide-react";

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-white"
        >
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
