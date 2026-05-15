import axios from "axios";
import { getPaymentTermsTyp } from '../api/socioDeNegocio.api.js'

export const getBusinessPartnersSL = async ({socio_Negocio}) => {
    const URL= import.meta.env.VITE_API_URL || 'http://localhost:4000';
    try {
        const response = await axios.get(`${URL}/sap/business-partners`,{params:{socio_Negocio}});
        //console.log('ñlkjklkjlk',response)
        console.log('busiines',response)
        //console.log('en busin', )
        return response;
    } catch (error) {
        return { error: error.response.data || 'Error fetching Business Partners from SL' };
    }
}

export const getPaymentTermsTypes = async(GroupNumber)=>{
    console.log('GroupNumber_servidce',GroupNumber)
    const res = await getPaymentTermsTyp(GroupNumber)
    return res

}
     