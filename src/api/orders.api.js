import axios from "./axios"

export const UpdateDocNumOrder = async(id, DocNum, tipoDocumento, U_V3_FCE_Enlace) => {
        console.log('en orders', U_V3_FCE_Enlace)
    console.log('values values', id, DocNum, tipoDocumento, U_V3_FCE_Enlace)
    return axios.get("/orders/insertDocNumInOrderNumber",{
        params: {id, DocNum, tipoDocumento, U_V3_FCE_Enlace}
    })
}