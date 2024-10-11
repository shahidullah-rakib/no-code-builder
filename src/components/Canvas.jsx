import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, updateElement } from '../redux/elementsSlice';
import { Rnd } from 'react-rnd';

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
          width: 100,
          height: 100,
          fontSize: '16px',
          color: '#000',
          x: 0,
          y: 0,
        },
      };
      dispatch(addElement(newElement));
    }
  };

  const handleDragStop = (e, d, id) => {
    dispatch(
      updateElement({
        id,
        styles: {
          x: d.x,
          y: d.y,
        },
      })
    );
  };

  const handleResizeStop = (e, direction, ref, delta, position, id) => {
    dispatch(
      updateElement({
        id,
        styles: {
          width: ref.style.width,
          height: ref.style.height,
          x: position.x,
          y: position.y,
        },
      })
    );
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-2/3 h-screen p-4 bg-gray-50 border"
    >
      {elements.map((el) => (
        <Rnd
          key={el.id}
          size={{
            width: el.styles.width || 'auto',
            height: el.styles.height || 'auto',
          }}
          position={{ x: el.styles.x, y: el.styles.y }}
          onDragStop={(e, d) => handleDragStop(e, d, el.id)}
          onResizeStop={(e, direction, ref, delta, position) =>
            handleResizeStop(e, direction, ref, delta, position, el.id)
          }
          bounds="parent"
          onClick={() => setSelectedElement(el)}
        >
          {el.type === 'text' ? (
            <p
              style={{
                fontSize: el.styles.fontSize,
                color: el.styles.color,
                width: 'auto',
                height: 'auto',
              }}
            >
              {el.content}
            </p>
          ) : (
            <img
              src={el.content}
              alt="Dropped"
              style={{
                width: el.styles.width,
                height: el.styles.height,
              }}
            />
          )}
        </Rnd>
      ))}
    </div>
  );
};

export default Canvas;
