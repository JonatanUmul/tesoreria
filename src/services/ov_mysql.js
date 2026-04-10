import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

const Ocemaco = async (a) => {

    try {
        const response = await axios.post(`${URL}/ocemaco/solicitud`, {
            params: {
                a
            },
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.error) {
            throw new Error(`HTTP Error:`);
        }
        const datosOC = await response;
        return datosOC

    } catch (error) {
        console.log('JSON: ', error)
    }
}


export default Ocemaco

