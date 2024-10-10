// src/components/SourceCodeModal.js
import React from 'react';

const SourceCodeModal = ({ isOpen, onClose, elements }) => {
  if (!isOpen) return null;

  const generateSourceCode = () => {
    return elements
      .map((el) =>
        el.type === 'text'
          ? `<p>${el.content}</p>`
          : `<img src="${el.content}" alt="Image"/>`
      )
      .join('\n');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Source Code</h2>
        <pre className="border p-4 bg-gray-100">{generateSourceCode()}</pre>
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
