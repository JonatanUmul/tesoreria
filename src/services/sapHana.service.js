import {centrosDeCostos} from "../api/sapHana.api.js"
export const getCentrosDeCostos= async(socio_Negocio)=>{
    const res = await centrosDeCostos(socio_Negocio)
    return res
}