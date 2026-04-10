
import { message } from "antd";
import axios from "axios";

const SAP_HANA = 'https://www.eco-aplicaciones.com/sapconn';

export const get_Disponibilidad_Bodega_sl = async(itemCode, WhsCodeor) => {

    try {
        const response= await axios.post(`${SAP_HANA}/disponible_Items`,
            {
                ItemCode: itemCode,
                WhsCode: WhsCodeor || "Bodega99"
            },
            { headers: {
                "Content-Type": "application/json"
            }}
        )

        return response
    } catch (error) {

        return {
            ok:false,
            message:error?.response?.data
        }
    }
}
