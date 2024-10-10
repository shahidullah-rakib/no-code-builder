// src/components/Sidebar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addElement } from '../redux/elementsSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData('elementType', type);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen">
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
