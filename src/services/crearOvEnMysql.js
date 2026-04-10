import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const CrearOvEnMysql=async({payload})=>{
    console.log('datos de orden de venta',payload)
    const response = await axios.post(`${URL}/ov_pedidoMysqlCompleto/post_ov`,{
        payload
    })

    return response
}

export default CrearOvEnMysql