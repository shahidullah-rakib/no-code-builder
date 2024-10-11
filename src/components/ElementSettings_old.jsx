import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateElement } from '../redux/elementsSlice';

const ElementSettings = ({ element }) => {
  const dispatch = useDispatch();

  // Text state
  const [content, setContent] = useState(element.content);
  const [fontSize, setFontSize] = useState(element.styles?.fontSize || '16px');
  const [fontColor, setFontColor] = useState(element.styles?.color || '#000');
  const [fontFamily, setFontFamily] = useState(
    element.styles?.fontFamily || 'Arial'
  );
  const [textAlign, setTextAlign] = useState(
    element.styles?.textAlign || 'left'
  );
  const [bold, setBold] = useState(element.styles?.bold || false);
  const [italic, setItalic] = useState(element.styles?.italic || false);
  const [underline, setUnderline] = useState(
    element.styles?.underline || false
  );

  // Image state
  const [imageSrc, setImageSrc] = useState(element.content);
  const [width, setWidth] = useState(element.styles?.width || 200);
  const [height, setHeight] = useState(element.styles?.height || 200);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(width / height);
  const [brightness, setBrightness] = useState(
    element.styles?.brightness || 100
  );
  const [contrast, setContrast] = useState(element.styles?.contrast || 100);
  const [grayscale, setGrayscale] = useState(element.styles?.grayscale || 0);
  const [borderWidth, setBorderWidth] = useState(
    element.styles?.borderWidth || 0
  );
  const [borderColor, setBorderColor] = useState(
    element.styles?.borderColor || '#000000'
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResize = (dimension, value) => {
    if (dimension === 'width') {
      setWidth(value);
      if (lockAspectRatio) setHeight(value / aspectRatio);
    } else {
      setHeight(value);
      if (lockAspectRatio) setWidth(value * aspectRatio);
    }
  };

  const dispatchUpdate = () => {
    const updatedStyles =
      element.type === 'text'
        ? {
            fontSize,
            color: fontColor,
            fontFamily,
            textAlign,
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
          }
        : {
            width,
            height,
            brightness,
            contrast,
            grayscale,
            borderWidth,
            borderColor,
          };

    dispatch(
      updateElement({
        ...element,
        content: element.type === 'text' ? content : imageSrc,
        styles: updatedStyles,
      })
    );
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen">
      <h2 className="text-xl font-bold mb-4">Element Settings</h2>

      {element.type === 'text' && (
        <>
          <TextSettings
            content={content}
            setContent={setContent}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontColor={fontColor}
            setFontColor={setFontColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            bold={bold}
            setBold={setBold}
            italic={italic}
            setItalic={setItalic}
            underline={underline}
            setUnderline={setUnderline}
          />
        </>
      )}

      {element.type === 'image' && (
        <ImageSettings
          imageSrc={imageSrc}
          handleImageUpload={handleImageUpload}
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          handleResize={handleResize}
          lockAspectRatio={lockAspectRatio}
          setLockAspectRatio={setLockAspectRatio}
          brightness={brightness}
          setBrightness={setBrightness}
          contrast={contrast}
          setContrast={setContrast}
          grayscale={grayscale}
          setGrayscale={setGrayscale}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
        />
      )}

      <button
        onClick={dispatchUpdate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
    </div>
  );
};

// TextSettings component
const TextSettings = ({
  content,
  setContent,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  fontFamily,
  setFontFamily,
  textAlign,
  setTextAlign,
  bold,
  setBold,
  italic,
  setItalic,
  underline,
  setUnderline,
}) => (
  <>
    <div>
      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
    </div>

    {/* Font Size */}
    <div className="mt-4">
      <label>Font Size:</label>
      <input
        type="number"
        value={parseInt(fontSize)}
        onChange={(e) => setFontSize(e.target.value + 'px')}
        className="border p-2 w-full"
      />
    </div>

    {/* Font Color */}
    <div className="mt-4">
      <label>Font Color:</label>
      <input
        type="color"
        value={fontColor}
        onChange={(e) => setFontColor(e.target.value)}
        className="border p-2 w-full"
      />
    </div>

    {/* Font Family */}
    <div className="mt-4">
      <label>Font Family:</label>
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>

    {/* Text Alignment */}
    <div className="mt-4">
      <label>Text Alignment:</label>
      <select
        value={textAlign}
        onChange={(e) => setTextAlign(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>

    {/* Bold, Italic, Underline */}
    <div className="mt-4 flex space-x-4">
      <label>
        <input
          type="checkbox"
          checked={bold}
          onChange={(e) => setBold(e.target.checked)}
        />
        Bold
      </label>
      <label>
        <input
          type="checkbox"
          checked={italic}
          onChange={(e) => setItalic(e.target.checked)}
        />
        Italic
      </label>
      <label>
        <input
          type="checkbox"
          checked={underline}
          onChange={(e) => setUnderline(e.target.checked)}
        />
        Underline
      </label>
    </div>
  </>
);

// ImageSettings component
const ImageSettings = ({
  imageSrc,
  handleImageUpload,
  width,
  height,
  handleResize,
  lockAspectRatio,
  setLockAspectRatio,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  grayscale,
  setGrayscale,
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
}) => (
  <div>
    {/* Image Upload */}
    <div className="mb-4">
      <label>Upload New Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block mt-2"
      />
    </div>

    {/* Image Size */}
    <div className="mb-4">
      <label>Width: {width}px</label>
      <input
        type="range"
        min="50"
        max="1000"
        value={width}
        onChange={(e) => handleResize('width', e.target.value)}
        className="w-full"
      />
    </div>

    <div className="mb-4">
      <label>Height: {height}px</label>
      <input
        type="range"
        min="50"
        max="1000"
        value={height}
        onChange={(e) => handleResize('height', e.target.value)}
        className="w-full"
      />
    </div>

    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          checked={lockAspectRatio}
          onChange={(e) => setLockAspectRatio(e.target.checked)}
        />
        Lock Aspect Ratio
      </label>
    </div>

    {/* Brightness */}
    <div className="mb-4">
      <label>Brightness: {brightness}%</label>
      <input
        type="range"
        min="0"
        max="200"
        value={brightness}
        onChange={(e) => setBrightness(e.target.value)}
        className="w-full"
      />
    </div>

    {/* Contrast */}
    <div className="mb-4">
      <label>Contrast: {contrast}%</label>
      <input
        type="range"
        min="0"
        max="200"
        value={contrast}
        onChange={(e) => setContrast(e.target.value)}
        className="w-full"
      />
    </div>

    {/* Grayscale */}
    <div className="mb-4">
      <label>Grayscale: {grayscale}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={grayscale}
        onChange={(e) => setGrayscale(e.target.value)}
        className="w-full"
      />
    </div>

    {/* Border */}
    <div className="mb-4">
      <label>Border Width: {borderWidth}px</label>
      <input
        type="range"
        min="0"
        max="20"
        value={borderWidth}
        onChange={(e) => setBorderWidth(e.target.value)}
        className="w-full"
      />
    </div>

    <div className="mb-4">
      <label>Border Color:</label>
      <input
        type="color"
        value={borderColor}
        onChange={(e) => setBorderColor(e.target.value)}
        className="w-full"
      />
    </div>
  </div>
);

export default ElementSettings;
