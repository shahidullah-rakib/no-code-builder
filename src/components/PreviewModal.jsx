// src/components/PreviewModal.js
import React from 'react';

const PreviewModal = ({ isOpen, onClose, elements }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Preview</h2>
        <div className="border p-4">
          {elements.map((el) => (
            <div key={el.id}>
              {el.type === 'text' ? (
                <p>{el.content}</p>
              ) : (
                <img src={el.content} alt="Preview" />
              )}
            </div>
          ))}
        </div>
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

export default PreviewModal;
