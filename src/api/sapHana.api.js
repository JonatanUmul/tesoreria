import axios from "./axios"

export const centrosDeCostos = async(values)=>{
    console.log('cardcode para centro', values)
    return axios.get('/sapHana/centrosDeCostos',{
        params: { values }
    })
}
