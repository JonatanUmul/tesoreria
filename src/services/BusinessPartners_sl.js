import axios from "axios";

const getBusinessPartnersSL = async ({socio_Negocio}) => {
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

export default getBusinessPartnersSL;
     