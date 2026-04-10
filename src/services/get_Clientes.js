import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const sociosNegocio=async({estado})=>{
    console.log(estado)
    try {
        const response= await axios.get(`${URL}/socioDeNegocio/estado`,{
           params: {estado}
        })
        console.log('sn',response.data.data)
        return response.data.data
    } catch (error) {
        console.log('error', error)
    }
}

export default sociosNegocio