import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import PreviewModal from '../components/PreviewModal';
import SourceCodeModal from '../components/SourceCodeModal';
import { useSelector } from 'react-redux';

const Home = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
  const elements = useSelector((state) => state.elements.elements);

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        onPreview={() => setPreviewOpen(true)}
        onSourceCode={() => setSourceCodeOpen(true)}
      />
      <div className="flex flex-1">
        <Sidebar />
        <Canvas />
      </div>
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        elements={elements}
      />
      <SourceCodeModal
        isOpen={sourceCodeOpen}
        onClose={() => setSourceCodeOpen(false)}
        elements={elements}
      />
    </div>
  );
};

export default Home;
