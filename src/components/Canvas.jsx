// src/components/Canvas.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement } from '../redux/elementsSlice';

const Canvas = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);

  const handleDrop = (event) => {
    const elementType = event.dataTransfer.getData('elementType');
    if (elementType) {
      const newElement = {
        id: Date.now(),
        type: elementType,
        content: elementType === 'text' ? 'New Text' : 'Image URL',
      };
      dispatch(addElement(newElement));
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-3/4 h-screen p-4 bg-gray-50"
    >
      {elements.map((el) => (
        <div key={el.id} className="border p-4 mb-2 bg-white">
          {el.type === 'text' ? (
            <p>{el.content}</p>
          ) : (
            <img src={el.content} alt="Dropped" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
