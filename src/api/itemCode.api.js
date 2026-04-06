import axios from "./axios"

export const postItemCode = async(values)=>{
    return axios.post("/itemCode/create",{
        datos: { values }
    })
}

export const itemCodeId = async(values)=>{
    console.log('en api',values)
    return axios.get("/itemCode/id",{
        params: { values }
    })
}

//cuando se elimina un item de la oc se cambia el estado a inactivo
export const putItemCode = async(value)=>{
    return axios.post("/itemCode/update",{
        datos: { value }
    })
}

export const updateItemCod = async(value)=>{
    return axios.post("/itemCode/update/payload",{
        datos: { value }
    })
}

export const workflowItemCode = async() => {
    const url= import.meta.env.VITE_API_UPDATEITEMS;
    return fetch(url)
}