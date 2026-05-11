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

  const disabledButton = () =>{
    switch (formulario) {
      case "VerFacturaReserva":
        if(URL_PDF){
          setDisabled(false)
        }
        break;
       case "LogModificaciones":
          setDisabled(false)
        break;
      default:
        return null;
    }
  }

useEffect(()=>{
  disabledButton()
},[formulario, URL_PDF])
  return (
    <>
    <Button onClick={showModal} disabled={disabled}>{tituloDragable()}</Button>

<Modal
  title={
    <div
      style={{ width: "100%", cursor: "move" }}
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
  style={{ top: 20 }}
  width="90vw"
  styles={{
    body: {
      height: "80vh",
      overflowY: "auto",
      padding: 20,
    },
  }}
  modalRender={(modal) => (
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