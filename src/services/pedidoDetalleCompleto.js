import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const pedidoDetalleCompleto = async(numeroPedido) => {

    try {
        const response= await axios.get(`${URL}/orders/orderNumber`,
            {params:numeroPedido}
        )
        console.log('respuesta preciso',response)
        return response
    } catch (error) {
        console.log('error12',error.response.data.message)
       return error?.response?.data
    }
}

export default pedidoDetalleCompleto