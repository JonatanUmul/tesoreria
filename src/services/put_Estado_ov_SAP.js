import { message } from "antd";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const put_pedidoHeaderCompleto = async({id, ordenDeVenta, DocNum}) => {

    try {
        const response= await axios.put(`${URL}/ov_pedidoHeaderCompleto/put_ov`,{
           id, ordenDeVenta, DocNum
        })
            console.log('response en pedidoHeaderCompleto', response);
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

export default put_pedidoHeaderCompleto