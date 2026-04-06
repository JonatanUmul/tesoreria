import { useState, useEffect } from 'react'
import TableItemCode from '../components/TableItemCode'
import SelectEstado from '../components/Select'
import SelectSocioNegocio from '../components/Select'
import get_itemcode from '../services/get_ItemCode'
import sociosNegocio from '../services/get_Clientes'
import ButtonCustom from '../components/ButtonCustom'
import Modal from "../components/Modal"
const ItemCode = () => {

    const [estado, setEstado] = useState('activo')
    const [tienda, setTienda] = useState('C00162')
    const [data, setData] = useState([])
    console.log('datos itemCode',data)
    const [dataSn, setDataSn] = useState([])
    console.log('dataSn',dataSn)
    const [open, setOpen] = useState(false);
  const get_ItemCode=async()=>{
    const response= await get_itemcode({estado, cardCode_cadena:tienda})
    console.log(response)
    setData(response || [])
  }

  const get_socioNegocio = async()=>{
    const response = await sociosNegocio({estado})
    setDataSn(response)
  }

  useEffect(()=>{
    get_socioNegocio()
  },[estado])

  useEffect(()=>{
    get_ItemCode()
  },[estado, tienda])

  const items = [
    data?.map((a)=>
  ({
        //key: (index)+1,
        id: a.id,
        estado: a.estado,
        cardCode_cadena: a.cardCode_cadena,
        name_cadena: a.name_cadena,
        sku_cliente: a.sku_cliente,
        descripcion_cliente: a.descripcion_cliente,
        sku_ecofiltro: a.sku_ecofiltro,
        descripcion_ecofiltro: a.descripcion_ecofiltro,
        precio_sinIva:a.precio_sinIva
  })
  )
  ];
  
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

        <SelectSocioNegocio 
          defaultValue={'C00162'}
          options={clientes[0]} 
          disabled={false} 
          placeholder='Cliente' 
          onChange={setTienda}
        />
          <Modal socioDeNegocio={clientes} formulario='itemCode'/>
      </div>

      {/* TABLA */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <TableItemCode datos={items[0]}/>
      </div>

    </div>
  )
}

export default ItemCode