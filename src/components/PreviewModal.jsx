import React from 'react';

const PreviewModal = ({ isOpen, onClose, elements }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-screen-lg w-full">
        <h2 className="text-lg font-bold mb-4">Preview</h2>

        {/* Preview Container */}
        <div className="border p-4 relative h-96 bg-gray-100 overflow-auto">
          {elements.map((el) => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: `${el.styles.x}px`,
                top: `${el.styles.y}px`,
                width: el.styles.width,
                height: el.styles.height,
              }}
            >
              {el.type === 'text' ? (
                <p
                  style={{
                    fontSize: el.styles.fontSize,
                    color: el.styles.color,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                  }}
                >
                  {el.content}
                </p>
              ) : (
                <img
                  src={el.content}
                  alt="Uploaded"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
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
