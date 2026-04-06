import { getSociosDeNegocio, postSociosDeNegocio, postEjecutarWorckFlow } from "../api/socioDeNegocio.api.js"

export const fetchSocioDeNegocio = async(estado) => {
    const res = await getSociosDeNegocio(estado);
    return res
}

export const fetchCrearSocioDeNegocio = async(value) => {
    const res = await postSociosDeNegocio(value);
    return res
}

export const ejecutarWorckFlow = async(value) => {
    const res = await postEjecutarWorckFlow(value);
    return res
}