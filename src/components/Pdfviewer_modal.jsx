import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Draggable from 'react-draggable';
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const App = ({nameButton, file}) => {
    if (!file) return;

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef(null);
    const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = e => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = e => {
    console.log(e);
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <>
      <Button onClick={showModal}>{nameButton}</Button>
      <Modal
        title={
          <div
            style={{ width: '100%', cursor: 'move' }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Vista Documento
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
           {/* Barra superior */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-300 shadow-sm z-10">
        <span className="text-gray-700 font-semibold text-sm">
          📄 Vista previa del PDF
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition"
          >
            −
          </button>
          <span className="text-sm text-gray-700 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition"
          >
            +
          </button>
          <button
            onClick={resetZoom}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition"
          >
            ⟳
          </button>
        </div>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-auto bg-gray-200">
        {file ? (
          <div className="flex justify-start items-start p-4 w-max">
            <div
              className="bg-white shadow-lg rounded-md p-4"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(err) =>
                  console.error("Error al cargar PDF:", err)
                }
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={850}
                    className="my-4"
                  />
                ))}
              </Document>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            📂 No hay PDF cargado
          </div>
        )}
      </div>
   </Modal>
    </>
  );
};
export default App;