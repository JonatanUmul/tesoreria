import React, { useEffect, useState } from 'react';
import { PlusOutlined, OrderedListOutlined } from '@ant-design/icons';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigate } from 'react-router-dom';
import TableOrdenesDeVenta from '../components/TablaOrdenesDeVenta'
import pedidoHeaderCompleto from '../services/pedidoHeaderCompleto';
import SelectReusable from '../components/Select';
import {runWorkflowItemCode} from '../services/itemCode.service'
import Alert from "../components/Alert.jsx"
const FormDisabledDemo = () => {

  const navigate = useNavigate()
  const op=localStorage.getItem('o')
  
  const [datos, setDatos] = useState([])
  const [opcion, setOpcion] = useState(op)
  localStorage.setItem('o',opcion)
  const [error, setError] = useState([])
  const [alert, SetAlert] = useState({});
  const data = Array.isArray(datos)&&datos?.map(item => item) || [];
  const get_Data_OV = async () => {
    const response = await pedidoHeaderCompleto({ opcion });
    setDatos(response)
  };

  const updateItems = async()=>{
    const respuesta = await runWorkflowItemCode()
    console.log('work',respuesta)
       if(respuesta.ok){
     SetAlert({
        ok: respuesta.ok,
        tipo: "success",
        text: 'Ejecución del workflow completada correctamente.'
      });
    }else{
    SetAlert({
       ok: !respuesta.ok,
       tipo: "info",
       text: 'Ocurrió un error al ejecutar el proceso. Por favor, contacte al administrador del sistema.'
     });
}
  }
  const options = [
    { value: "orden de venta", label: "Orden de venta" },
    { value: "factura de reserva", label: "Factura de reserva" },
    { value: "pendiente", label: "Pendiente" }
  ];

  useEffect(() => {
    get_Data_OV();
  }, [opcion]);

  return (
    <div style={{
      padding: "20px",
      background: "#f4f6f9",
      minHeight: "100vh"
    }}>

      {/* FILTRO */}
      <div style={{
        background: "#ffffff",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <span style={{
          fontWeight: "600",
          color: "#0b3c5d"
        }}>
          Estado:
        </span>

        <SelectReusable
          disabled={false}
          options={options}
          placeholder="Selecciona estado"
          defaultValue={op}
          onChange={setOpcion}
        />
       {/* <ButtonCustom onClick={updateItems} disabled='false' text='Actualizar items'/>*/}
      </div>
    {alert.ok ? <Alert alert={alert} /> : null}
      {/* TABLA */}
    <div style={{
   background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
     
}}>
  <TableOrdenesDeVenta dato={data}/>
</div>

    </div>
  );
};

export default () => <FormDisabledDemo />;