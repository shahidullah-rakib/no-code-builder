import React from 'react';

const PreviewModal = ({ isOpen, onClose, elements }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Canvas Preview</h2>
        <div className="border p-4 bg-gray-100 rounded-lg h-96 overflow-auto">
          {/* Canvas Area */}
          <div className="relative w-full h-full bg-white border shadow-inner">
            {elements.map((el) => (
              <div
                key={el.id}
                className="p-2 mb-2"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {el.type === 'text' ? (
                  <p className="text-base text-gray-800">{el.content}</p>
                ) : (
                  <img
                    src={el.content}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                  />
                )}
              </div>
            ))}
          </div>
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
