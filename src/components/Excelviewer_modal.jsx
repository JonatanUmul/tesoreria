import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button, Modal, Table } from 'antd';
import Draggable from 'react-draggable';
const ExcelViewer = ({nameButton, file}) => {
  const [data, setData] = useState([]);

const readExcel = () => {
  if (!file) return; // evita error si no hay archivo

  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
setData(jsonData);


    if (jsonData.length > 0) setData(jsonData);
  };
  reader.readAsArrayBuffer(file);
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
