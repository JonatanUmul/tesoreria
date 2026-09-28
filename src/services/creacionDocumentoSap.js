import axios from "../api/axios.js";

const creacionPedido_sl = async({tipoDoc, payload}) => {

    try {
        const response= await axios.post(tipoDoc=='oc'? "/sap/orders" : "/sap/invoinces",{
            payload:payload
        })
       return response;
    } catch (error) {
        return {error: error?.response?.data || 'Error fetching Business Partners from SL'};
    }
}

export default creacionPedido_sl;
