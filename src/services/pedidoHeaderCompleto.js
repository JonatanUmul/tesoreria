import { message } from "antd";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const pedidoHeaderCompleto = async(opcion) => {
console.log('datos aaaa',opcion)
    try {
        const response= await axios.get(`${URL}/orders`,
            {params:opcion}
        )
       
        return response?.data?.data[0]
    } catch (error) {
        return error?.response?.data
    }
}

export default pedidoHeaderCompleto