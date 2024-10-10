import React from 'react';

const TopBar = ({ onPreview, onSourceCode }) => {
  // Correct prop name
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center justify-end px-4">
      <button
        onClick={onPreview}
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Preview
      </button>
      <button
        onClick={onSourceCode} // Make sure this matches the prop in Home.js
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        See Source Code
      </button>
    </div>
  );
};

export default TopBar;
