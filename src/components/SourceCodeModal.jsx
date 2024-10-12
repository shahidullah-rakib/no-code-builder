import React from 'react';

const SourceCodeModal = ({ isOpen, onClose, htmlContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
        <h2 className="text-lg font-bold mb-4">Source Code</h2>
        <pre className="border p-4 bg-gray-100 overflow-auto max-h-96">
          {htmlContent}
        </pre>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SourceCodeModal;
