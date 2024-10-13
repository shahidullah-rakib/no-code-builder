import React from 'react';

const Sidebar = () => {
  const handleDragStart = (event, type) => {
    event.dataTransfer.setData('elementType', type);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Elements</h2>
      <div
        draggable
        onDragStart={(event) => handleDragStart(event, 'text')}
        className="p-4 bg-white border rounded mb-2 cursor-pointer"
      >
        Text
      </div>
      <div
        draggable
        onDragStart={(event) => handleDragStart(event, 'image')}
        className="p-4 bg-white border rounded cursor-pointer"
      >
        Image
      </div>
    </div>
  );
};

export default Sidebar;
