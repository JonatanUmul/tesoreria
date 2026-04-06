import axios from "./axios"

export const UpdateDocNumOrder = async(id, DocNum, tipoDocumento) => {
    console.log('values values', id, DocNum, tipoDocumento)
    return axios.get("/orders/insertDocNumInOrderNumber",{
        params: {id, DocNum, tipoDocumento}
    })
}