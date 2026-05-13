import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonCustom from '../components/ButtonCustom';
import TableOrdenesDeVenta from '../components/TablaOrdenesDeVenta';
import pedidoHeaderCompleto from '../services/pedidoHeaderCompleto';
import { pedidoDetalleEstadoCompleto } from "../services/pedidoDetalleCompleto";
import SelectReusable from '../components/Select';
import { runWorkflowItemCode } from '../services/itemCode.service';
import Alert from "../components/Alert.jsx";
import Fecha from "../components/fechas.jsx";
import Input from "../components/Input.jsx";
import { formatFecha } from '../services/FormatearFecta.js';
import { useNavigate } from "react-router-dom";
import ExcelDowloan from '../components/ExcelDowloan.jsx';
const FormDisabledDemo = () => {

  const op = localStorage.getItem('o') || 'orden de venta';
  const id_mail = localStorage.getItem('id_e');
  const f_inicio = localStorage.getItem('f_inicio');
  const f_fin = localStorage.getItem('f_fin');
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [opcion, setOpcion] = useState(op);
  const [alert, SetAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [detallePedido, setDetallePedido] = useState([])
  const [filtros, setFiltros] = useState({
    op: op,
    id_email: id_mail,
    fechaInicio: f_inicio,
    fechaFin: f_fin
  });

  const data = Array.isArray(datos) ? datos : [];
  console.log('detalle123',detallePedido)
  // =========================
  // OBTENER DATA
  // =========================
  const get_Data_OV = async () => {
    try {

      setLoading(true);

      const response = await pedidoHeaderCompleto({
        filtros
      });

      setDatos(response);

    } catch (error) {

      console.error(error);

      SetAlert({
        ok: true,
        tipo: "error",
        text: "Ocurrió un error al obtener la información."
      });

    } finally {
      setLoading(false);
    }
  };

    const detalleOrdenDeVenta = async () => {
    try {
      const response = await pedidoDetalleEstadoCompleto(filtros.op );
      setDetallePedido(response);
    } catch (error) {
      console.log('error123',error)
        SetAlert({
        ok: true,
        tipo: "info",
        text: error
      });
    }
  };

  // =========================
  // ACTUALIZAR ITEMS
  // =========================
  const updateItems = async () => {

    const respuesta = await runWorkflowItemCode();

    if (respuesta.ok) {

      SetAlert({
        ok: true,
        tipo: "success",
        text: 'Ejecución del workflow completada correctamente.'
      });

    } else {

      SetAlert({
        ok: true,
        tipo: "info",
        text: 'Ocurrió un error al ejecutar el proceso. Por favor, contacte al administrador del sistema.'
      });

    }
  };

  const updateUrlFact = async()=>{
        try {
        const response= await axios.get("https://agente.ecofiltro.net/webhook/infile_url");
        setTimeout(() => {
        navigate("/h2h/OrdenDeVenta");
      }, 1000);
        console.log("Webhook ejecutado correctamente", response);
      } catch (error) {
        console.error("Error ejecutando webhook:", error);
      }
  }

  // =========================
  // OPTIONS SELECT
  // =========================
  const options = [
    { value: "orden de venta", label: "Orden de venta" },
    { value: "factura de reserva", label: "Factura de reserva" },
    { value: "pendiente", label: "Pendiente" },
    { value: "cancelado", label: "Cancelado" }
  ];

  // =========================
  // CAMBIO ESTADO
  // =========================
  const handleEstado = (value) => {

    setOpcion(value);

    setFiltros((prev) => ({
      ...prev,
      op: value
    }));
  };

  // =========================
  // CAMBIO FECHAS
  // =========================
  const HandleChanges = (e) => {

    setFiltros((prev) => ({
      ...prev,
      fechaInicio: e?.[0] ? formatFecha(e[0]) : null,
      fechaFin: e?.[1] ? formatFecha(e[1]) : null
    }));
  };

  // =========================
  // INPUT EMAIL
  // =========================
  const handleInput = (e) => {

    const value = e.target.value;

    setValueInput(value);

    setFiltros((prev) => ({
      ...prev,
      id_email: value
    }));
  };

  // =========================
  // BUSCAR
  // =========================
  const Buscar = () => {
    get_Data_OV();
  };

  // =========================
  // GUARDAR LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem('o', opcion);
    localStorage.setItem('id_e', filtros.id_email);
    localStorage.setItem('f_inicio', filtros.fechaInicio);
    localStorage.setItem('f_fin', filtros.fechaFin);
  }, [opcion, filtros]);
 
  //===========================
  //Usefect
  //===========================
  useEffect(()=>{
    get_Data_OV()
  },[])

  useEffect(()=>{
    detalleOrdenDeVenta()
  },[opcion])
  return (

    <div
      style={{
        padding: "20px",
        background: "#f4f6f9",
        minHeight: "100vh"
      }}
    >

      {/* FILTROS */}
      <div
        style={{
          background: "#ffffff",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >

        <span
          style={{
            fontWeight: "600",
            color: "#0b3c5d"
          }}
        >
          Estado:
        </span>

        <SelectReusable
          disabled={false}
          options={options}
          placeholder="Selecciona estado"
          defaultValue={op}
          onChange={handleEstado}
        />

        <Input
          defaulValue={id_mail}
          type="text"
          placeholder="Id_Email"
          handleChange={handleInput}
          value={valueInput}
        />

        <Fecha onDateChanges={HandleChanges} f_inicio={f_inicio} f_fin={f_fin}/>

        {/* <ButtonCustom
          onClick={updateItems}
          disabled={false}
          text='Actualizar items'
        /> */}

        <ButtonCustom
          text={loading ? 'Buscando...' : 'Buscar'}
          disabled='false'
          onClick={Buscar}

        />
           <ButtonCustom
          text={loading ? 'Actualizando...' : 'Actualizar factura'}
          disabled='false'
          onClick={updateUrlFact}

        />
         <div className="col-md-3 d-flex align-items-end">
 <ExcelDowloan datos={detallePedido}/>
        </div>
      </div>

      {/* ALERT */}
      {alert.ok ? <Alert alert={alert} /> : null}

      {/* TABLA */}
      <div
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
       
        <TableOrdenesDeVenta dato={data} />

      </div>

    </div>
  );
};

export default FormDisabledDemo;