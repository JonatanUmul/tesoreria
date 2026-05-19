import axios from "axios";
import {pedidoDetalleEstadoComplet, updateCantidadDeta} from "../api/orders.api.js"
const URL = import.meta.env.VITE_API_URL;

export const pedidoDetalleCompleto = async(numeroPedido) => {

    try {
        const response= await axios.get(`${URL}/orders/orderNumber`,
            {params:numeroPedido}
        )
        return response
    } catch (error) {
        console.log('error12',error.response.data.message)
       //return error?.response?.data
        return { ok: false, message: "Error ejecutando workflow" };
    }
}

export const pedidoDetalleEstadoCompleto = async(estado)=>{
    try {
        const response = await pedidoDetalleEstadoComplet(estado)
        return response
    } catch (error) {
        return { ok: false, message: "Error al obtener detalles de ordenes" };
    }
}


export const updateCantidadDetalle = async(datos) =>{
    console.log('12345as',datos)
    try {
        const response = await updateCantidadDeta(datos)
        return response
    } catch (error) {
        return { ok: false, message: "Error al actualizar la cantidad" };
    }
}