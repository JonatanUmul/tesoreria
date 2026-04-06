import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

const creacionPedido_sl = async({tipoDoc, payload}) => {

    try {
        const response= await axios.post(tipoDoc=='oc'? `${URL}/sap/orders` : `${URL}/sap/invoinces`,{
            payload:payload
        })
       return response;
    } catch (error) {
        return {error: error?.response?.data || 'Error fetching Business Partners from SL'};
    }
}

export default creacionPedido_sl;