import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import MenuLayout from "../components/Menu.component.jsx";
import Pagos from "../pages/Pagos.page.jsx";
import Viaticos from "../pages/Pagos.viaticos.jsx";
import OrdenDeVenta from "../pages/ordenDeVenta.clientes.jsx";
import UploanDocumentos from "../pages/uploanDocumentos.jsx";
import OrdenDetalle from "../pages/DetalleOrdenDeVenta.jsx";
import ItemCode from "../pages/ItemCode.jsx";
import SocioDeNegocio from "../pages/socioDeNegocio.jsx";
import Login from "../pages/Login.jsx";
const NotFound = () => <h1>404 | Página No Encontrada</h1>;

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        {/* 1. Redirecciones */}
        <Route path="/h2h/login" element={<Login/>} />
        <Route path="/" element={<Navigate to="/h2h/login" replace />} />
        <Route path="/h2h" element={<Navigate to="/h2h/login" replace />} />
        <Route path="/h2h/" element={<Navigate to="/h2h/login" replace />} />

        <Route
          path="/h2h/pagos"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <Pagos></Pagos>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/h2h/viaticos"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <Viaticos></Viaticos>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/h2h/OrdenDeVenta"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <OrdenDeVenta></OrdenDeVenta>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
        
         <Route
          path="/h2h/OrdenDeVenta/uploanDocumentos"
          element={
            <ProtectedRoute>
            <MenuLayout>
              <UploanDocumentos></UploanDocumentos>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/h2h/OrdenDeVenta/detalleOrdenDeVenta/:idPedido"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <OrdenDetalle></OrdenDetalle>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
          <Route
          path="/h2h/ItemCode"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <ItemCode></ItemCode>
            </MenuLayout>
            </ProtectedRoute>
          }
        />
          <Route
          path="/h2h/socioDeNegocio"
          element={
             <ProtectedRoute>
            <MenuLayout>
              <SocioDeNegocio></SocioDeNegocio>
            </MenuLayout>
             </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
