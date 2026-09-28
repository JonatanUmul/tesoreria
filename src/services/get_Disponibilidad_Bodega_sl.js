import axios from "../api/axios.js";

export const get_Disponibilidad_Bodega_sl = async(itemCode, WhsCodeor) => {

    try {
        const response= await axios.post("/sapHana/disponibilidad-bodega",
            {
                ItemCode: itemCode,
                WhsCode: WhsCodeor || "Bodega99"
            },
            { headers: {
                "Content-Type": "application/json"
            }}
        )

        return response.data
    } catch (error) {

        return {
            ok:false,
            message:error?.response?.data
        }
    }
}
