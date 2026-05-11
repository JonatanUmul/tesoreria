import axios from "./axios"

export const getLogModificaciones = async(values)=>{
    console.log('Valores1234 ',values)
    return axios.get("/log/modificaciones",{
        params: { values }
    })
}
export const postLogModificaciones = async(values)=>{
    console.log('logdelete ',values)
    return axios.post("/log/post_modificaciones",{
        params: { values }
    })
}

