import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginServices } from "../services/Login.service";
import { UserContext } from "../context/user.context.jsx";
import Alert from "../components/Alert.jsx"
const Login = () => {
  const [user, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [alert, SetAlert] = useState({});
const { setUserName, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await LoginServices(user, pass);
   
console.log(respuesta)
      if (respuesta.data.ok) {
         SetAlert({
        ok: respuesta.data.ok,
        tipo: "success",
        text: respuesta.data.message || "Succes",
      });
  const data = respuesta.data.data;

  setUserName(data.nombre);
  setUserId(data.id);

  navigate("/h2h/OrdenDeVenta");

      } else {
        console.log('res',respuesta)
        alert("Usuario o contraseña incorrectos");
       
      }

    } catch (error) {
       SetAlert({
        ok: error?.response?.data?.ok,
        tipo: "error",
        text: error?.response?.data?.message || "Error"
      });

      alert("Error al iniciar sesión");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftSection}>
        <div style={styles.formContainer}>
          <div style={styles.logo}>ecofiltro</div>
          <h1 style={styles.title}>Portal de Facturación</h1>
          <p style={styles.subtitle}>Gestión inteligente de purificación.</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Correo o Usuario"
              style={styles.input}
              value={user}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              style={styles.input}
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
            {alert.ok !== undefined && <Alert alert={alert} />}
            <button type="submit" style={styles.loginBtn}>
              INGRESAR
            </button>
          </form>

          <footer style={styles.footer}>
            © 2026 Ecofiltro S.A. <br />
            <span>Privacidad | Términos</span>
          </footer>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.overlay}>
          <h2 style={styles.heroText}>Agua pura, <br /> vida sana.</h2>
          <div style={styles.accentLine}></div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#fff',
    fontFamily: "'Inter', sans-serif",
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  rightSection: {
    flex: '1.2', // Un poco más ancha que la izquierda
    backgroundColor: '#003358',
    backgroundImage: 'linear-gradient(135deg, #003358 0%, #001a2d 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    textAlign: 'left',
    color: 'white',
    padding: '60px',
  },
  heroText: {
    fontSize: '3.5rem',
    fontWeight: '700',
    lineHeight: '1.1',
    margin: 0,
    opacity: '0.9',
  },
  accentLine: {
    width: '60px',
    height: '6px',
    backgroundColor: '#00A3E0', // Un azul más claro para contraste
    marginTop: '20px',
    borderRadius: '10px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#003358',
    marginBottom: '8px',
    letterSpacing: '-1px',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 5px 0',
    color: '#1a1a1a',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '16px 20px',
    borderRadius: '12px', // Bordes modernos, no tan circulares
    border: '1px solid #e1e1e1',
    color:'#778da9',
    backgroundColor: '#f8f9fa',
    fontSize: '15px',
    outline: 'none',
  },
  forgotPass: {
    background: 'none',
    border: 'none',
    color: '#003358',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'right',
    padding: '0 5px',
    marginBottom: '10px',
  },
  loginBtn: {
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#003358',
    color: 'white',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  footer: {
    marginTop: '50px',
    fontSize: '12px',
    color: '#aaa',
    lineHeight: '1.6',
  }
};

export default Login;