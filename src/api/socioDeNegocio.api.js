import axios from "./axios";

export const getSociosDeNegocio = async (estado) => {
  console.log(estado);
  return axios.get("/socioDeNegocio/estado", {
    params: { estado }
  })
};

export const postSociosDeNegocio = async (value) => {
  return axios.post("/socioDeNegocio/create", {
    params: { value }
  })
};

export const postEjecutarWorckFlow = async (value) => {
    let resultado = null;
  switch (value.cardCode) {
    case "C01096": resultado = fetch(import.meta.env.VITE_API_GLOGO); break;
    case "C00102": resultado = fetch(import.meta.env.VITE_API_ELEKTRA); break;
    case "C00001": resultado = fetch(import.meta.env.VITE_API_ELMASTIL); break;
    case "C00034": resultado = fetch(import.meta.env.VITE_API_EPA); break;
    case "C00009": resultado = fetch(import.meta.env.VITE_API_FFACSA); break;
    case "C03955": resultado = fetch(import.meta.env.VITE_API_ALMACENES_JAPON); break;
    case "C02927": resultado = fetch(import.meta.env.VITE_API_TIENDAS_ASOCIADAS); break;
    case "C00162": resultado = fetch(import.meta.env.VITE_API_CEMACO); break;
    case "C00086": resultado = fetch(import.meta.env.VITE_API_NOVEX); break;
    case "C03674": resultado = fetch(import.meta.env.VITE_API_FERRETERIAESPANA); break;
    case "C00039": resultado = fetch(import.meta.env.VITE_API_AKI); break;
    default: 
      console.log('CardCode no soportado');
  }
  return {resultado};
}