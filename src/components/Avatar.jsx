import React, { useContext } from 'react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context.jsx";

const Avatarjs = () => {

  const { userName, setUserName, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.clear(); // limpia todo
    setUserName(""); // limpia contexto
    setUserId(0);

    navigate("/h2h/login"); // redirige
  };

  const items = [
    /*{
      key: '1',
      label: 'Mi perfil',
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: 'Configuración',
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },*/
    {
      key: '3',
      label: 'Cerrar sesión',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout 
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 10 }}>

        <Avatar.Group>
          <Avatar
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`}
          />
        </Avatar.Group>

        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 500 }}>
            {userName || "Usuario"}
          </span>
          <span style={{ fontSize: 12, color: '#888' }}>
            {/* aquí puedes poner email si luego lo guardas */}
            sesión activa
          </span>
        </div>

      </div>
    </Dropdown>
  );
};

export default Avatarjs;