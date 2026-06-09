import axios from "./axios"

export const UpdateDocNumOrder = async(id, DocNum, DocEntry, tipoDocumento, U_V3_FCE_Enlace) => {
        console.log('enrders', DocEntry)
    console.log('values values', id, DocNum, tipoDocumento, U_V3_FCE_Enlace)
    return axios.get("/orders/insertDocNumInOrderNumber",{
        params: {id, DocNum, DocEntry, tipoDocumento, U_V3_FCE_Enlace}
    })
}

export const pedidoDetalleEstadoComplet = async(estado) =>{
    console.log('opcionEstado',estado)
    return axios.get("/orders/orderStatus",
        {params:{estado}}
    )
}

export const getStatusInvoicesSap = async(DocNum) =>{
    return axios.post("/sap/statusInvoinces",{
        DocNum
    })
}

export const updateCantidadDeta = async(datos)=>{
    return axios.put("/orders/updateCantidadDetalle",{
        datos
    })
}