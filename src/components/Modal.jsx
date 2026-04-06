import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Draggable from 'react-draggable';
import FormItemCode from './FormItemCode';
import FormSocioNegocio from './FormSocioNegocio';
import UpdateItemCode from './updateItemCode';

const App = ({ formulario, socioDeNegocio , record, get_socioNegocio}) => { 
  console.log('en modal', record)

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef(null);

  const showModal = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) return;

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleSuccess = () => {
    setOpen(false); 
    get_socioNegocio()
  };

  const renderFormulario = () => {
    switch (formulario) {
      case "itemCode":
        return <FormItemCode socioDeNegocio={socioDeNegocio} onSuccess={handleSuccess}/>;
      case "socioNegocio":
        return <FormSocioNegocio onSuccess={handleSuccess}/>;
      case "updateItemCode":
        return <UpdateItemCode record={record} onSuccess={handleSuccess} />;
      default:
        return null;
    }
  };

  const tituloDragable = ()=>{
    switch (formulario) {
      case "itemCode":
        return <p>Crear ItemCode</p>;
      case "socioNegocio":
        return <p>Crear Socio de Negocio</p>;
      case "updateItemCode":
        return <p>Actualizar ItemCode</p>;
      default:
        return null;
    }
  }

  return (
    <>
      <Button onClick={showModal}>{tituloDragable()}</Button>

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
           {tituloDragable()}
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
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
      {renderFormulario()}
      </Modal>
    </>
  );
};

export default App;