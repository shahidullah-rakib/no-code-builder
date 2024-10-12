import React from 'react';

const SourceCodeModal = ({ isOpen, onClose, elements }) => {
  if (!isOpen) return null;

  // Generate formatted HTML source code with proper indentation
  const generateSourceCode = () => {
    return elements
      .map((el) =>
        el.type === 'text'
          ? `<p>${el.content}</p>`
          : `<img src="${el.content}" alt="Image" />`
      )
      .join('\n  ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Source Code</h2>
        <div className="border p-4 bg-gray-100 rounded-lg h-96 overflow-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-800">
            <code>{`<div>\n  ${generateSourceCode()}\n</div>`}</code>
          </pre>
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

export default SourceCodeModal;
