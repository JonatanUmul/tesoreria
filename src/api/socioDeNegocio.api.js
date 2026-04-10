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
  let url = null;

  switch (value.cardCode) {
    case "C01096": url = import.meta.env.VITE_API_GLOGO; break;
    case "C00102": url = import.meta.env.VITE_API_ELEKTRA; break;
    case "C00001": url = import.meta.env.VITE_API_ELMASTIL; break;
    case "C00034": url = import.meta.env.VITE_API_EPA; break;
    case "C00009": url = import.meta.env.VITE_API_FFACSA; break;
    case "C03955": url = import.meta.env.VITE_API_ALMACENES_JAPON; break;
    case "C02927": url = import.meta.env.VITE_API_TIENDAS_ASOCIADAS; break;
    case "C00162": url = import.meta.env.VITE_API_CEMACO; break;
    case "C00086": url = import.meta.env.VITE_API_NOVEX; break;
    case "C03674": url = import.meta.env.VITE_API_FERRETERIAESPANA; break;
    case "C00039": url = import.meta.env.VITE_API_AKI; break;
    case "C00030": url = import.meta.env.VITE_API_WALMART; break;
    default:
      return { ok: false, message: "CardCode no soportado" };
  }

  try {
    const response = await fetch(url, {
      method: "POSt", // importante si mandas datos
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });

    const data = await response.json();

    return {
        ok: data?.ok ?? response.ok,   // usa el ok del backend si existe
      resultado: data
    };

  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error
    };
  }
};