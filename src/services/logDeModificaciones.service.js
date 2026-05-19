import {getLogModificaciones, postLogModificaciones} from "../api/logDeModificaciones.api"

export const fetchLogModificaicones = async(values) => {
    console.log('Valores123',values)
    const res = await getLogModificaciones(values)
    return res
}

export const postLogModificaicones = async(values) =>{
    console.log('logggg',values)
    const res = await postLogModificaciones(values)
    return res
}