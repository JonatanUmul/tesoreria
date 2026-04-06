// pages/OrdenDetalle.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getBusinessPartnersSL from "../services/BusinessPartners_sl.js";
import pedidoDetalleCompleto from "../services/pedidoDetalleCompleto.js";
import { get_Disponibilidad_Bodega_sl } from "../services/get_Disponibilidad_Bodega_sl.js";
import Select from "../components/Select.jsx";

export default function OrdenDetalle() {
  const navigate = useNavigate();
  const location = useLocation();
  const datos_state = location.state;

  const numeroPedido = datos_state?.pedido?.pedido;
  const socio_Negocio = datos_state?.pedido?.cod_sap || "";

  const [cliente, setCliente] = useState({});
  const [detallePedido, setDetallePedido] = useState({});
  const [WhsCodeor, setWhsCode] = useState("Bodega99");
  const [disponibleBodega, setDisponibleBodega] = useState({});
  const [cantidades, setCantidades] = useState({});

  const items = Array.isArray(detallePedido?.data?.data)
    ? detallePedido.data.data
    : [];

  const options = [
    { value: "Bodega10", label: "Bodega10" },
    { value: "Bodega05", label: "Bodega05" },
    { value: "Bodega04", label: "Bodega04" },
    { value: "Bodega99", label: "Bodega99" },
    { value: "Bodega98", label: "Bodega98" },
    { value: "Bodega95", label: "Bodega95" },
    { value: "Bodega67", label: "Bodega67" },
  ];

  // ======================
  // API
  // ======================
  const cargarCliente = async () => {
    const data = await getBusinessPartnersSL({ socio_Negocio });
    setCliente(data);
  };

  const cargarDetallePedido = async () => {
    const response = await pedidoDetalleCompleto({ numeroPedido });
    setDetallePedido(response);
  };

  const consultarDisponibilidad = async (modelo) => {
    const response = await get_Disponibilidad_Bodega_sl(modelo, WhsCodeor);
    setDisponibleBodega(prev => ({
      ...prev,
      [modelo]: response?.data?.[0] ?? response
    }));
  };

  // ======================
  // EFFECTS
  // ======================
  useEffect(() => {
    if (socio_Negocio) cargarCliente();
  }, [socio_Negocio]);

  useEffect(() => {
    if (numeroPedido) cargarDetallePedido();
  }, [numeroPedido]);

  useEffect(() => {
    if (!items.length) return;

    const inicial = {};
    items.forEach(i => {
      inicial[i.modelo] = i.cantidad;
    });
    setCantidades(inicial);
  }, [items]);

  useEffect(() => {
    if (!items.length || !WhsCodeor) return;

    const modelos = [...new Set(items.map(i => i.modelo))];
    modelos.forEach(m => consultarDisponibilidad(m));
  }, [items, WhsCodeor]);

  // ======================
  // HANDLERS
  // ======================
  const cambiarCantidad = (modelo, value) => {
    setCantidades(prev => ({
      ...prev,
      [modelo]: Number(value)
    }));
  };

  // ======================
  // RENDER
  // ======================
  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-semibold mb-6">
        Detalle Orden #{numeroPedido}
      </h1>

      {/* CLIENTE */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-5">
        <h2 className="text-lg font-semibold mb-3">Información del Cliente</h2>
        <p><strong>Código SAP:</strong> {cliente.CardCode}</p>
        <p><strong>NIT/CUI:</strong> {cliente.AdditionalID}</p>
        <p><strong>Nombre:</strong> {cliente.CardName}</p>
        <p><strong>Teléfono:</strong> {cliente.Phone1}</p>
        <p><strong>Dirección:</strong> {cliente.Address}</p>
        <p><strong>Email:</strong> {cliente.EmailAddress}</p>
      </div>

      {/* ITEMS */}
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Ítems Solicitados</h2>

        <Select
          value={WhsCodeor}
          options={options}
          onChange={setWhsCode}
        />

        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b">
              <th>Código</th>
              <th>Descripción</th>
              <th>Bodega</th>
              <th>Stock</th>
              <th>Comprom.</th>
              <th>Disponible</th>
              <th>Cant.</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((a, i) => {
              const cantidad = cantidades[a.modelo] ?? a.cantidad;
              const stock = disponibleBodega[a.modelo]?.En_stock ?? 0;
              const comprometido = disponibleBodega[a.modelo]?.Comprometido ?? 0;
              const disponibleSAP = disponibleBodega[a.modelo]?.Disponible ?? 0;
              const ok = stock >= cantidad;

              return (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td>{a.modelo}</td>
                  <td>{a.descripcion}</td>
                  <td>{WhsCodeor}</td>
                  <td className="text-center">{Math.trunc(stock)}</td>
                  <td className="text-center">{Math.trunc(comprometido)}</td>
                  <td className="text-center">{Math.trunc(disponibleSAP)}</td>

                  <td>
                    <input
                      type="number"
                      value={cantidad}
                      onChange={(e) => cambiarCantidad(a.modelo, e.target.value)}
                      style={{
                        textAlign: "center",
                        background: ok ? "#fff" : "#c91919",
                        color: ok ? "#000" : "#fff"
                      }}
                    />
                  </td>

                  <td>{ok ? "Disponible" : "Insuficiente"}</td>
                  <td>Q{a.costo}</td>
                  <td>Q{cantidad * a.costo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
