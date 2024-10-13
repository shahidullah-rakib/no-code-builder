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
  const [fontFamily, setFontFamily] = useState(
    element.styles.fontFamily || 'Arial'
  ); // New state for font family
  const [fontStyle, setFontStyle] = useState(
    element.styles.fontStyle || 'normal'
  ); // New state for font style
  const [lineHeight, setLineHeight] = useState(
    element.styles.lineHeight || '1.5'
  ); // New state for line height
  const [letterSpacing, setLetterSpacing] = useState(
    element.styles.letterSpacing || '0px'
  ); // New state for letter spacing

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
    setFontFamily(element.styles.fontFamily || 'Arial'); // Update fontFamily state
    setFontStyle(element.styles.fontStyle || 'normal'); // Update fontStyle state
    setLineHeight(element.styles.lineHeight || '1.5'); // Update lineHeight state
    setLetterSpacing(element.styles.letterSpacing || '0px'); // Update letterSpacing state
  }, [element]);

  const dispatchUpdate = () => {
    const updatedStyles = {
      fontSize,
      color: fontColor,
      textAlign,
      fontFamily,
      fontStyle, // Include font style in updated styles
      lineHeight, // Include line height in updated styles
      letterSpacing, // Include letter spacing in updated styles
    };

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

          {/* Font Family Selection */}
          <label>Font Family:</label>
          <select
            className="border p-2 w-full"
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              dispatchUpdate(); // Update when changing font family
            }}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            {/* Add more font options as needed */}
          </select>

          {/* Font Style Selection */}
          <label>Font Style:</label>
          <select
            value={fontStyle}
            onChange={(e) => {
              setFontStyle(e.target.value);
              dispatchUpdate(); // Update when changing font style
            }}
            className="border p-2 w-full"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
          </select>

          {/* Line Height Input */}
          <label>Line Height:</label>
          <input
            type="number"
            value={parseFloat(lineHeight)}
            onChange={(e) => {
              setLineHeight(e.target.value);
              dispatchUpdate(); // Update when changing line height
            }}
            className="border p-2 w-full"
            step="0.1"
          />

          {/* Letter Spacing Input */}
          <label>Letter Spacing:</label>
          <input
            type="number"
            value={parseFloat(letterSpacing)}
            onChange={(e) => {
              setLetterSpacing(e.target.value + 'px');
              dispatchUpdate(); // Update when changing letter spacing
            }}
            className="border p-2 w-full"
            step="0.1"
          />
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
