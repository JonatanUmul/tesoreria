import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

const oc_pdf = async (fileUpload) => {
    const formData = new FormData();
    formData.append("file", fileUpload);

    try {
        const response = await axios.post(`${URL}/ocpdf/application`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

        if (response.error) {
            throw new Error(`HTTP Error:`);
        }
        const datosOC = await response;
        return datosOC

    } catch (error) {
        console.log('JSON: ', error)
    }
}


export default oc_pdf

