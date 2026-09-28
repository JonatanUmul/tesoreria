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

  const [userToken, setUserToken] = React.useState(
    JSON.parse(sessionStorage.getItem("userToken")) || ""
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
    if (userName && userToken) {
      sessionStorage.setItem("userIsAdmin", JSON.stringify(userIsAdmin));
      sessionStorage.setItem("userIsRRHH", JSON.stringify(userIsRRHH));
      sessionStorage.setItem("userName", JSON.stringify(userName));
      sessionStorage.setItem("userToken", JSON.stringify(userToken));
      sessionStorage.setItem("userId", JSON.stringify(userId));
      sessionStorage.setItem("codigos", JSON.stringify(codigos));
      sessionStorage.setItem("userTelefono", JSON.stringify(userTelefono));
    }
  }, [userName, userToken, userIsAdmin, userIsRRHH, userId, codigos, userTelefono]);

  const logout = () => {
    sessionStorage.clear();
    setUserIsAdmin(null);
    setUserIsRRHH(null);
    setUserName("");
    setUserToken("");
    setUserTelefono("");
    setUserId(0);
    setCodigos([]);
  };

  return (
    <UserContext.Provider
      value={{
        userIsAdmin,
        setUserIsAdmin,
        userIsRRHH,
        setUserIsRRHH,
        userName,
        setUserName,
        userToken,
        setUserToken,
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
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
