import { useState, useEffect } from 'react'
import TablaSociosNegocios from '../components/TablaSociosNegocios'
import SelectEstado from '../components/Select'
/*import SelectSocioNegocio from '../components/Select'
import sociosNegocio from '../services/get_Clientes'
import ButtonCustom from '../components/ButtonCustom'*/
import { fetchSocioDeNegocio } from "../services/socioDeNegocio.service.js"
import Alert from "../components/Alert.jsx"
import Modal from "../components/Modal"
const ItemCode = () => {

    const [estado, setEstado] = useState('activo')
    const [data, setData] = useState([])
    const [dataSn, setDataSn] = useState([])
    const [open, setOpen] = useState(false);
    const [alert, SetAlert] = useState({});

  const get_socioNegocio=async()=>{
    try {
      const respuesta = await fetchSocioDeNegocio(estado)
      console.log(respuesta)
        setData(respuesta.data.data)
        SetAlert({
        ok: respuesta.data.ok,
        tipo: "success",
        text: respuesta.data.message,
      });
    } catch (error) {
      console.log(error)
      SetAlert({
        ok: !error.respuesta.data.ok,
        tipo: "warning",
        text: error.respuesta.data.message,
      });
    }
    //console.log('en fetchSocio Negocio',response)
    //setDataSn(respuesta)
  }


  useEffect(()=>{
    get_socioNegocio()
  },[estado,])

  
  const estados=[
    {value:'activo', label:'Activo'},
    {value:'inactivo', label:'Inactivo'}
  ]

  const clientes=[
    Array.isArray(dataSn)&&dataSn.map(a=>(
      {value:a.cardCode, label:a.nombre}

    ))
  ]

  return (
    <div style={{
      padding: "20px",
      background: "#f4f6f9",
      minHeight: "100vh"
    }}>

      {/* FILTROS */}
      <div style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        alignItems: "center"
      }}>
        
        <span style={{
          fontWeight: "600",
          color: "#0b3c5d",
          marginRight: "10px"
        }}>
          Filtros:
        </span>
       
        <SelectEstado 
          defaultValue='activo' 
          options={estados} 
          disabled={false} 
          placeholder='Estado' 
          onChange={setEstado}
        />
          <Modal formulario='socioNegocio'/>
      </div>
{alert.ok ? <Alert alert={alert} /> : null}
      {/* TABLA */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
             <TablaSociosNegocios datos={data}/>
      </div>

    </div>
  )
}

export default ItemCode