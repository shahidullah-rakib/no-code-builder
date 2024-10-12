import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import PreviewModal from '../components/PreviewModal';
import SourceCodeModal from '../components/SourceCodeModal';
import { useSelector } from 'react-redux';
import ElementSettings from '../components/ElementSettings';

const Home = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
  const elements = useSelector((state) => state.elements.elements); // Get elements from Redux store
  const [selectedElement, setSelectedElement] = useState(null); // To track the selected element

  // Function to generate HTML structure from elements for source code display
  const generateSourceCode = () => {
    return elements
      .map((el) =>
        el.type === 'text'
          ? `<p style="position: absolute; left: ${el.styles.x}px; top: ${el.styles.y}px; font-size: ${el.styles.fontSize}; color: ${el.styles.color}; width: ${el.styles.width}; height: ${el.styles.height};">${el.content}</p>`
          : `<img src="${el.content}" alt="Image" style="position: absolute; left: ${el.styles.x}px; top: ${el.styles.y}px; width: ${el.styles.width}; height: ${el.styles.height};"/>`
      )
      .join('\n');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* TopBar with Preview and Source Code buttons */}
      <TopBar
        onPreview={() => setPreviewOpen(true)} // Open Preview Modal
        onSourceCode={() => setSourceCodeOpen(true)} // Open Source Code Modal
      />

      <div className="flex flex-1">
        {/* Sidebar and Canvas components */}
        <Sidebar />
        <Canvas setSelectedElement={setSelectedElement} />

        {/* Element settings panel */}
        {selectedElement && <ElementSettings element={selectedElement} />}
      </div>

      {/* Preview Modal to show the canvas elements */}
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        elements={elements} // Pass elements to Preview Modal for rendering
      />

      {/* Source Code Modal to show the generated HTML */}
      <SourceCodeModal
        isOpen={sourceCodeOpen}
        onClose={() => setSourceCodeOpen(false)}
        htmlContent={generateSourceCode()} // Generate and pass source code for rendering
      />
    </div>
  );
};

export default Home;
