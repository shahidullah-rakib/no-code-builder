import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, updateElement } from '../redux/elementsSlice';

const Canvas = ({ setSelectedElement }) => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);

  const handleDrop = (event) => {
    const elementType = event.dataTransfer.getData('elementType');
    if (elementType) {
      const newElement = {
        id: Date.now(),
        type: elementType,
        content: elementType === 'text' ? 'New Text' : 'Image URL',
        styles: {
          fontSize: '16px',
          color: '#000',
        },
      };
      dispatch(addElement(newElement));
    }
  };

  const handleElementClick = (el) => {
    setSelectedElement(el);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-2/3 h-screen p-4 bg-gray-50 border"
    >
      {elements.map((el) => (
        <div
          key={el.id}
          onClick={() => handleElementClick(el)}
          className="border p-4 mb-2 bg-white"
        >
          {el.type === 'text' ? (
            <p style={{ fontSize: el.styles.fontSize, color: el.styles.color }}>
              {el.content}
            </p>
          ) : (
            <img src={el.content} alt="Dropped" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
