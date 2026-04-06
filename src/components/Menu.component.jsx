import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { ShoppingCartOutlined, AppstoreOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import Avatarjs from './Avatar';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}


const MenuLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
  {
    key: 'header-proveedores',
    label: (
     <div
  style={{
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    padding: collapsed ? 0 : '0 20px',
    marginTop:15 ,
  }}
>
        <img
    src={
      collapsed
        ? "https://ecofiltro.com.gt/wp-content/uploads/2025/03/Azul-ecofiltro-scaled-e1755531179767.png"
        : "https://ecofiltro.com.gt/wp-content/uploads/2025/03/Azul-ecofiltro-scaled-e1755531179767.png"
    }
    alt="Ecofiltro"
    style={{
      width: collapsed ? 35 : 140,
      transition: "all 0.3s ease",
      marginBottom:20,
      objectFit: "contain"
    }}
  />
      </div>
    ),
    disabled: true
  },

  /*getItem('Órdenes de Compra', 'sub3', <ShoppingCartOutlined />, [
    getItem('Órdenes', '/h2h/OrdenDeVenta'),
    getItem('Artículos', '/h2h/ItemCode'),
    getItem('Socios de Negocio', '/h2h/socioDeNegocio')
  ]),*/
getItem('Órdenes', '/h2h/OrdenDeVenta', <ShoppingCartOutlined />),
getItem('Artículos', '/h2h/ItemCode', <AppstoreOutlined />),
getItem('Socios de Negocio', '/h2h/socioDeNegocio', <TeamOutlined />)
];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }} className='w-screen'>
      <Sider className='fixed w-64 h-screen' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
       
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['sub1', 'sub2']}
          onClick={(e) => {
            if (e.key.startsWith('/')) {
              navigate(e.key);
            }
          }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.3s" }}>
        <Header  className="bg-white shadow-sm flex items-center px-6" style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        height: 64,
      }} >
         <Avatarjs/>
      </Header>
        <Content className="padding-lef pl-30 flex-grow"  style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer className='bg-gray-700 p-4 text-white' style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
