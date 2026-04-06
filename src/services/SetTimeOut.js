import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const SetTimeOut=({tiempo, ruta})=> {
    console.log(tiempo, ruta)
   // console.log('redireccionamiento', typeof tiempo, ruta)
    const navigate = useNavigate();
    setTimeout(() => {
        console.log('entro acaaaa')
      navigate("/h2h/OrdenDeVenta");
    },500); 
  
    /*{tiempo || ruta ?
useEffect(()=>{
    SetTimeOut()
},[tiempo, ruta])
:null
}
*/
}

