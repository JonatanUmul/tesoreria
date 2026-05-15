import {UpdateDocNumOrder, getStatusInvoicesSap} from "../api/orders.api.js"
const URL = import.meta.env.VITE_API_URL;

export const getsocios = async (  ) => {
    try {
        
        const response = await fetch(
            `${URL}/sap/socios`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        console.log('RESPONSE: ', response)
        const sociosResponse = await response.json();
        console.log('sociosResponse: ', sociosResponse)
        if (sociosResponse.error) {
         throw new Error(`HTTP Error:`);
        }
        return sociosResponse.data
    } catch (error) {
     console.log('JSON: ', error);
    }
}


export const updateUpdateDocNumOrder = async (id, DocNum, tipoDocumento, U_V3_FCE_Enlace) =>{
    console.log('en service', U_V3_FCE_Enlace)
   const res = await UpdateDocNumOrder(id, DocNum, tipoDocumento, U_V3_FCE_Enlace)
   console.log(res)
}

export const getStatusInvoicesInSap = async(DocNum) =>{
    console.log('DocNumService',DocNum)
    const res = await getStatusInvoicesSap(DocNum)
    return res
}

