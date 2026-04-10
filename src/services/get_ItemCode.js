import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
 const Itemcode=async({estado, cardCode_cadena})=>{
    console.log(estado, cardCode_cadena)
    try {
        const response= await axios.get(`${URL}/itemCode`,{
           params: {estado, cardCode_cadena}
        })
        console.log('etiemcode',response.data.data)
        return response.data.data
    
    } catch (error) {
        console.log('error', error)
    }
}

export default Itemcode