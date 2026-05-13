import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Draggable from 'react-draggable';
import FormItemCode from './FormItemCode';
import FormSocioNegocio from './FormSocioNegocio';
import UpdateItemCode from './updateItemCode';
import LeerUrlPdf from './LeerURL'
import LogModificaciones from './LogModificaciones'

const App = ({title, formulario, socioDeNegocio , record, get_socioNegocio, URL_PDF}) => { 
console.log('URL_PDF',URL_PDF)
  const [open, setOpen] = useState(false);
  console.log('entro aca: ',open)
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
      case "VerFacturaReserva":
        return <LeerUrlPdf record={record} onSuccess={handleSuccess} URL_PDF={URL_PDF}/>;
      case "LogModificaciones":
        return <LogModificaciones record={record} onSuccess={handleSuccess}/>;
      default:
        return null;
    }
  };

  const tituloDragable = ()=>{
    switch (formulario) {
      case "itemCode":
        return <p>{title}</p>;
      case "socioNegocio":
        return <p>Crear Socio de Negocio</p>;
      case "updateItemCode":
        return <p>Actualizar ItemCode</p>;
      case "VerFacturaReserva":
        return <p>{title}</p>
      case "LogModificaciones":
        return <p>{title}</p>
      default:
        return null;
    }
  }

  const modalConfig = () => {
  switch (formulario) {
    case "VerFacturaReserva":
      return {
        width: "98vw",
        height: "92vh",
      };

    case "LogModificaciones":
      return {
        width: "85vw",
        height: "80vh",
      };

    case "updateItemCode":
      return {
        width: "70vw",
        height: "70vh",
      };

    case "itemCode":
      return {
        width: "60vw",
        height: "65vh",
      };

    case "socioNegocio":
      return {
        width: "55vw",
        height: "60vh",
      };

    default:
      return {
        width: "75vw",
        height: "75vh",
      };
  }
};

const config = modalConfig();
  const disabledButton = () =>{
    switch (formulario) {
      case "itemCode":
          setDisabled(false)
        break;
      case "updateItemCode":
          setDisabled(false)
        break;
      case "VerFacturaReserva":
        if(URL_PDF){
          setDisabled(false)
        }
        break;
       case "LogModificaciones":
          setDisabled(false)
        break;
       case "socioNegocio":
          setDisabled(false)
        break;
      default:
        return null;
    }
  }

useEffect(()=>{
  disabledButton()
},[title, formulario, socioDeNegocio , record, get_socioNegocio, URL_PDF])
  return (
    <>
    <Button style={{fontSize:"8px"}} onClick={showModal} disabled={disabled}>{tituloDragable()}</Button>

<Modal
  destroyOnClose
  title={
    <div
      style={{
        width: "100%",
        cursor: "move",
        fontWeight: "bold",
        fontSize: "18px",
      }}
      onMouseOver={() => setDisabled(false)}
      onMouseOut={() => setDisabled(true)}
    >
      {tituloDragable()}
    </div>
  }
  open={open}
  onOk={handleOk}
  onCancel={handleCancel}
  footer={null}
  maskClosable={false}
  width={config.width}
  style={{
    top: 10,
  }}
  styles={{
    content: {
      padding: 10,
      borderRadius: 10,
    },
    body: {
      height: config.height,
      overflowY: "auto",
      overflowX: "hidden",
      padding: 0,
    },
  }}
  modalRender={(modal) => (
    <Draggable
      disabled={disabled}
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div ref={draggleRef}>
        {modal}
      </div>
    </Draggable>
  )}
>
  {renderFormulario()}
</Modal>
    </>
  );
};

export default App;