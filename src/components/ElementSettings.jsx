import React from 'react';
import { useDispatch } from 'react-redux';
import { updateElement } from '../redux/elementsSlice';

const ElementSettings = ({ element }) => {
  const dispatch = useDispatch();

  const handleUpdate = (field, value) => {
    dispatch(
      updateElement({
        id: element.id,
        styles: {
          ...element.styles,
          [field]: value,
        },
        content: field === 'content' ? value : element.content,
      })
    );
  };

  return (
    <div className="w-1/3 p-4 bg-white border">
      <h3>Element Settings</h3>
      {element.type === 'text' && (
        <>
          <label>
            Text Content:
            <input
              type="text"
              value={element.content}
              onChange={(e) => handleUpdate('content', e.target.value)}
              className="block p-2 border"
            />
          </label>
          <label>
            Font Size:
            <input
              type="number"
              value={parseInt(element.styles.fontSize)}
              onChange={(e) => handleUpdate('fontSize', `${e.target.value}px`)}
              className="block p-2 border"
            />
          </label>
          <label>
            Text Color:
            <input
              type="color"
              value={element.styles.color}
              onChange={(e) => handleUpdate('color', e.target.value)}
              className="block p-2 border"
            />
          </label>
        </>
      )}
      {element.type === 'image' && (
        <>
          <label>
            Image URL:
            <input
              type="text"
              value={element.content}
              onChange={(e) => handleUpdate('content', e.target.value)}
              className="block p-2 border"
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              value={element.styles.width}
              onChange={(e) => handleUpdate('width', `${e.target.value}px`)}
              className="block p-2 border"
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={element.styles.height}
              onChange={(e) => handleUpdate('height', `${e.target.value}px`)}
              className="block p-2 border"
            />
          </label>
        </>
      )}
    </div>
  );
};

export default ElementSettings;
