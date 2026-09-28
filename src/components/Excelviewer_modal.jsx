import React, { useState, useRef } from "react";
import { Button, Modal, Table } from 'antd';
import Draggable from 'react-draggable';
const ExcelViewer = ({nameButton, file}) => {
  const [data, setData] = useState([]);

const readExcel = () => {
  if (!file) return; // evita error si no hay archivo

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result || "";
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setData([]);
      return;
    }

    const separator = lines[0].includes("\t") ? "\t" : ",";
    const headers = lines[0].split(separator).map((header) => header.trim());
    const jsonData = lines.slice(1).map((line) => {
      const values = line.split(separator);
      return headers.reduce((row, header, index) => {
        row[header || `Columna ${index + 1}`] = values[index] || "";
        return row;
      }, {});
    });

    setData(jsonData);
  };
  reader.readAsText(file);
};


  React.useEffect(() => {
    if (file) readExcel(file);
  }, [file]);

    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef(null);
  

   const showModal = () => {
    setOpen(true);
  };
  const handleOk = e => {
    setOpen(false);
  };
  const handleCancel = e => {
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
           <Button
  onClick={showModal}
  disabled={!file}
  type="primary"
>
  {nameButton}
</Button>

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

   <Table
  dataSource={data.map((row, i) => ({ key: i, ...row }))}
  columns={Object.keys(data[0] || {}).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  }))}
  pagination={{ pageSize: 20 }}
  scroll={{ y: 400, x: "max-content" }}
  bordered
/>


      
       </Modal>
    </>
  );
};

export default ExcelViewer;
