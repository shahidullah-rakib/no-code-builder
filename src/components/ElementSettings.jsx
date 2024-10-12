import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateElement } from '../redux/elementsSlice';

const ElementSettings = ({ element }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(element.content || ''); // Default to empty string
  const [fontSize, setFontSize] = useState(element.styles.fontSize || '16px');
  const [fontColor, setFontColor] = useState(element.styles.color || '#000000');
  const [textAlign, setTextAlign] = useState(
    element.styles.textAlign || 'left'
  ); // New state for text alignment

  // For image resizing and content
  const [imageSrc, setImageSrc] = useState(element.content || '');
  const [width, setWidth] = useState(element.styles.width || '100px');
  const [height, setHeight] = useState(element.styles.height || '100px');

  useEffect(() => {
    // When element changes, update local state
    setContent(element.content);
    setFontSize(element.styles.fontSize || '16px');
    setFontColor(element.styles.color || '#000000');
    setImageSrc(element.content);
    setWidth(element.styles.width || '100px');
    setHeight(element.styles.height || '100px');
    setTextAlign(element.styles.textAlign || 'left'); // Update textAlign state
  }, [element]);

  const dispatchUpdate = () => {
    const updatedStyles =
      element.type === 'text'
        ? {
            fontSize,
            color: fontColor,
            textAlign, // Include text alignment in updated styles
          }
        : { width, height };

    dispatch(
      updateElement({
        ...element,
        content: element.type === 'text' ? content : imageSrc,
        styles: { ...element.styles, ...updatedStyles },
      })
    );
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      dispatchUpdate(); // Trigger the image update in the store
    }
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen">
      <h2 className="text-xl font-bold mb-4">Element Settings</h2>

      {/* Text settings */}
      {element.type === 'text' && (
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={dispatchUpdate} // Trigger update on blur
            className="border p-2 w-full"
          />
          <label>Font Size:</label>
          <input
            type="number"
            value={parseInt(fontSize)}
            onChange={(e) => setFontSize(e.target.value + 'px')}
            onBlur={dispatchUpdate}
            className="border p-2 w-full"
          />
          <label>Font Color:</label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            onBlur={dispatchUpdate}
            className="border p-4 w-full h-10"
          />

          <label>Text Alignment:</label>
          <select
            className="border p-2 w-full"
            value={textAlign}
            onChange={(e) => {
              setTextAlign(e.target.value);
              dispatchUpdate(); // Update when changing alignment
            }}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      )}

      {/* Image settings */}
      {element.type === 'image' && (
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageUpload} />
          <label>Width:</label>
          <input
            type="range"
            min="50"
            max="500"
            value={parseInt(width)}
            onChange={(e) => setWidth(e.target.value + 'px')}
            onMouseUp={dispatchUpdate} // Trigger update on mouse release
            className="w-full"
          />
          <label>Height:</label>
          <input
            type="range"
            min="50"
            max="500"
            value={parseInt(height)}
            onChange={(e) => setHeight(e.target.value + 'px')}
            onMouseUp={dispatchUpdate} // Trigger update on mouse release
            className="w-full"
          />
        </div>
      )}

      <button
        onClick={dispatchUpdate} // Trigger update on button click
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
    </div>
  );
};

export default ElementSettings;
