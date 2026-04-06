import React from "react";

export const UserContext = React.createContext();

export function UserProvider({ children }) {

  //  INICIALIZAR DESDE SESSION (CLAVE)
  const [userIsAdmin, setUserIsAdmin] = React.useState(
    JSON.parse(sessionStorage.getItem("userIsAdmin")) || null
  );

  const [userIsRRHH, setUserIsRRHH] = React.useState(
    JSON.parse(sessionStorage.getItem("userIsRRHH")) || null
  );

  const [userName, setUserName] = React.useState(
    JSON.parse(sessionStorage.getItem("userName")) || ""
  );

  const [userTelefono, setUserTelefono] = React.useState(
    JSON.parse(sessionStorage.getItem("userTelefono")) || ""
  );

  const [userId, setUserId] = React.useState(
    JSON.parse(sessionStorage.getItem("userId")) || 0
  );

  const [codigos, setCodigos] = React.useState(
    JSON.parse(sessionStorage.getItem("codigos")) || []
  );

  const [config, setConfig] = React.useState([]);
  const [foto, setFoto] = React.useState("");

  //  GUARDAR EN SESSION (cuando cambie)
  React.useEffect(() => {
    if (userName) {
      sessionStorage.setItem("userIsAdmin", JSON.stringify(userIsAdmin));
      sessionStorage.setItem("userIsRRHH", JSON.stringify(userIsRRHH));
      sessionStorage.setItem("userName", JSON.stringify(userName));
      sessionStorage.setItem("userId", JSON.stringify(userId));
      sessionStorage.setItem("codigos", JSON.stringify(codigos));
      sessionStorage.setItem("userTelefono", JSON.stringify(userTelefono));
    }
  }, [userName, userIsAdmin, userIsRRHH, userId, codigos, userTelefono]);

  return (
    <UserContext.Provider
      value={{
        userIsAdmin,
        setUserIsAdmin,
        userIsRRHH,
        setUserIsRRHH,
        userName,
        setUserName,
        userId,
        setUserId,
        codigos,
        setCodigos,
        foto,
        setFoto,
        config,
        setConfig,
        userTelefono,
        setUserTelefono,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}