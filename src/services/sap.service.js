import {UpdateDocNumOrder} from "../api/orders.api.js"
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


export const updateUpdateDocNumOrder = async (id, DocNum, tipoDocumento) =>{
   const res = await UpdateDocNumOrder(id, DocNum, tipoDocumento)
   console.log(res)
}

