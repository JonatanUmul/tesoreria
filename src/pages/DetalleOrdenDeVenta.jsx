// pages/OrdenDetalle.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Await, Navigate } from "react-router-dom";
import { get_Disponibilidad_Bodega_sl } from "../services/get_Disponibilidad_Bodega_sl.js";
import getBusinessPartnersSL from "../services/BusinessPartners_sl.js";
import pedidoDetalleCompleto from "../services/pedidoDetalleCompleto.js";
import ButtonCustom from "../components/ButtonCustom.jsx";
import Select from "../components/Select.jsx";
import creacionDocumentoSap from "../services/creacionDocumentoSap.js";
import Alert from "../components/Alert.jsx";
import Skeleton from "../components/Skeleton.jsx";
import Message from "../components/Message.jsx";
import put_Estado_ov_SAP from "../services/put_Estado_ov_SAP.js";
import { DeleteOutlined } from "@ant-design/icons";
import { updateItemCode } from "../services/itemCode.service.js";
import { getCentrosDeCostos } from "../services/sapHana.service.js";
import { updateUpdateDocNumOrder } from "../services/sap.service.js";
import {
  fetchLogModificaicones,
  postLogModificaicones,
} from "../services/logDeModificaciones.service.js";
import Modal from "../components/Modal.jsx";
import { UserContext } from "../context/user.context.jsx";
import Confirm from "../components/Confirm";
export default function OrdenDetalle() {
  const navigate = useNavigate();
  const location = useLocation();
  const datos_state = location.state;
  const { userName } = useContext(UserContext);
  // ======================
  // STATES
  // ======================
  const [dat, setDatos] = useState({}); //Datos del socio de negocio
  const [detallePedido, setDetallePedido] = useState([]);
  const [WhsCodeor, setWhsCode] = useState(
    datos_state?.pedido?.para_tienda == "006 Xela" ? "Bodega65" : "Bodega99",
  );
  const [tipoDoc, setTipoDocumento] = useState("oc");
  const [disponible_bodega, setDisponible_bodega] = useState({});
  const [cantidades, setCantidades] = useState({});
  const [nueva_cantidad, setNueva_cantidad] = useState(0);
  const item = detallePedido?.data?.data?.[0] || [];
  const [alert, SetAlert] = useState({});
  const [skelton, setSkeleton] = useState(false);
  const [messages, setMessages] = useState({});
  const [activateMessage, setActivateMessage] = useState(false);
  const [centroDeCostos, setCentrosDeCostos] = useState({});
  const [logModificaciones, setLogDeModificaciones] = useState({});
  const [openLog, setOpenLog] = useState(false);

  // ======================
  // Variables
  // ======================
  const options = [
    { value: "Bodega04", label: "Bodega04" },
    { value: "Bodega05", label: "Bodega05" },
    { value: "Bodega10", label: "Bodega10" },
    { value: "Bodega65", label: "Bodega65" },
    { value: "Bodega67", label: "Bodega67" },
    { value: "Bodega95", label: "Bodega95" },
    { value: "Bodega98", label: "Bodega98" },
    { value: "Bodega99", label: "Bodega99" },
  ];
  const tipoDocumento = [
    { value: "oc", label: "Orden de venta" },
    { value: "fr", label: "Factura de reserva" },
  ];

  const numeroPedido = datos_state?.pedido?.pedido;
  const id = datos_state?.pedido?.id;
  const socio_Negocio = datos_state?.pedido?.cod_sap || "";
  const Tienda = datos_state?.pedido?.tienda || "";
  const direccion_entrega = datos_state?.pedido?.direccion_entrega || "";
  const U_FacNit = dat.AdditionalID;
  const Phone1 = dat.Phone1;
  const DocNum =
    String(datos_state.pedido.DocNum) === "N/A" ? 0 : datos_state.pedido.DocNum;
  const fecha = new Date();
  const fechaGT = fecha.toLocaleDateString('en-CA', {
  timeZone: 'America/Guatemala'
  });
  console.log('fechaGT',fechaGT)
  // ======================
  // API CALLS
  // ======================

  const BusinessPartnersSL = async () => {
    const businessPartners = await getBusinessPartnersSL({ socio_Negocio });
    //const businessPartners = await getBusinessPartnersSL({  });
    let respuesta;

    if (businessPartners?.data?.data == undefined) {
      respuesta = businessPartners.error;
    } else {
      respuesta = businessPartners.data;
    }
    console.log("prueba aca", respuesta);

    if (respuesta.ok) {
      const objectBP = businessPartners?.data?.data;
      SetAlert({
        ok: !respuesta.ok,
        tipo: "info",
        text: respuesta.message,
      });
      setDatos((prev) => ({
        ...prev,
        AdditionalID: objectBP.AdditionalID,
        Address: objectBP.Address,
        CardCode: objectBP.CardCode,
        CardName: objectBP.CardName,
        CardType: objectBP.CardType,
        ContactPerson: objectBP.ContactPerson,
        EmailAddress: objectBP.EmailAddress,
        MailAddress: objectBP.MailAddress,
        Notes: objectBP.Notes,
        Phone1: objectBP.Phone1,
      }));
    } else {
      SetAlert({
        ok: respuesta.ok,
        tipo: "error",
        text: respuesta.message,
      });
    }
  };

  const detalleOrdenDeVenta = async () => {
    try {
      const response = await pedidoDetalleCompleto({ numeroPedido });
      setDetallePedido(response);
    } catch (error) {}
  };

  const ConsultarDisponibilidad_sl = async (modelo) => {
    const response = await get_Disponibilidad_Bodega_sl(modelo, WhsCodeor);
    setDisponible_bodega((prev) => ({
      ...prev,
      [modelo]: response?.data?.[0] ?? response,
    }));
  };

  const desactivarItemc = async (id) => {
    try {
      const estado = "inactivo";
      const values = { id, estado };
      const response = await updateItemCode(values);
      SetAlert({
        ok: response.data.ok,
        tipo: "success",
        text: response.data.message,
      });
      detalleOrdenDeVenta();
    } catch (error) {
      SetAlert({
        ok: !error.response.data.ok,
        tipo: "warning",
        text: error.response.data.message,
      });
    }
  };

  const centrosDeCostos = async (socio_Negocio) => {
    try {
      const respuesta = await getCentrosDeCostos(socio_Negocio);
      SetAlert({
        ok: !respuesta.data.ok,
        tipo: "info",
        text: respuesta.data.message,
      });
      setCentrosDeCostos(respuesta.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const put_pedidoHeaderCompleto_OV = async ({ id, ordenDeVenta, DocNum }) => {
    try {
      const response = await put_Estado_ov_SAP({ id, ordenDeVenta, DocNum });
      SetAlert({
        ok: true,
        tipo: "success",
        text: response.message,
      });
    } catch (error) {
      SetAlert({
        ok: false,
        tipo: "error",
        text: error,
      });
    }
  };

  const reconsultar = () => {
    (BusinessPartnersSL(), detalleOrdenDeVenta(), ConsultarDisponibilidad_sl());
  };

  const logDeModificaciones = async () => {
    let numeroPed = datos_state?.pedido?.pedido;
    try {
      const response = await fetchLogModificaicones(numeroPed);
      setOpenLog(true);
      setLogDeModificaciones(response.data.data);
    } catch (error) {
      SetAlert({
        ok: false,
        tipo: "error",
        text: error,
      });
    }
  };

  // ======================
  // EFFECTS
  // ======================
  // Cliente
  useEffect(() => {
    logDeModificaciones();
  }, [openLog]);
  useEffect(() => {
    if (socio_Negocio) BusinessPartnersSL();
  }, [socio_Negocio]);

  useEffect(() => {
    if (socio_Negocio) centrosDeCostos(socio_Negocio);
  }, [socio_Negocio]);

  // Pedido
  useEffect(() => {
    if (numeroPedido) detalleOrdenDeVenta();
  }, [numeroPedido]);

  // Disponibilidad (AUTOMÁTICO al entrar y al cambiar bodega)
  useEffect(() => {
    if (!Array.isArray(item) || item.length === 0) return;
    if (!WhsCodeor) return;
    item.forEach((a) => {
      if (a.d_sku_ecofiltro) {
        ConsultarDisponibilidad_sl(a.d_sku_ecofiltro);
      }
    });
  }, [item, WhsCodeor]);

  // ======================
  // NORMALIZACIÓN
  // ======================
  const orden = {
    cliente: {
      codigo_SAP: dat.CardCode,
      AdditionalID: dat.AdditionalID,
      nombre: dat.CardName,
      telefono: dat.Phone1,
      direccion: dat.Address,
      direccion_entrega: datos_state?.pedido?.direccion_entrega,
      pedido_para_tienda: datos_state?.pedido?.para_tienda,
      ContactPerson: dat.ContactPerson,
      Email: dat.EmailAddress,
      DocNum: datos_state?.pedido?.DocNum,
      fecha_oc: datos_state.pedido.age,
      Vendedor: centroDeCostos.Vendedor,
      name_cc_departamento: centroDeCostos.name_depto,
      name_cc_canal: centroDeCostos.name_canal,
      name_cc_vendedor: centroDeCostos.name_vendedor,
      cc_departamento: centroDeCostos.depto,
      cc_canal: centroDeCostos.canal,
      cc_vendedor: centroDeCostos.vendedor,
    },
    //items: Array.isArray(item) ? item : [],
  }; //Datos Socio de negocio

  // ======================
  //FUNCIONES
  // ======================
  const cambiarCantidad = (e, modelo, d_cantidad) => {
    const nuevaCantidad = e.target.value;
    setNueva_cantidad(nuevaCantidad);
    const cantidadAnterior = d_cantidad;
    setCantidades((prev) => ({
      ...prev,
      [modelo]: Number(e.target.value),
    }));

    if (cantidadAnterior !== nuevaCantidad) {
      let cambio = {
        cantidad: {
          antes: d_cantidad,
          despues: nuevaCantidad,
        },
      };
      return cambio;
    }

    postLogModificaicones({
      tabla: "orden_detalle_detalle",
      tipo_operacion: "UPDATE",
      id_registro: 0,
      referencia: numeroPedido,
      cambios: JSON.stringify(cambio),
      usuario: "system",
      origen: "WEB",
    });
  };

  const buildPayload = () => {
    const body =
      tipoDoc == "oc"
        ? {
            tipoDoc,
            id,
            CardCode: orden.cliente.codigo_SAP,
            bodega: WhsCodeor,
            para_tienda: orden.cliente.pedido_para_tienda,
            direccion_entrega,
            direccion: orden.cliente.direccion,
            U_DoctoNom: orden.cliente.nombre,
            U_FacNit: U_FacNit,
            U_OC: numeroPedido,
            U_Email: orden.cliente.Email,
            Phone1: Phone1,
            //date_oc: orden.cliente.fecha_oc,
            date_oc:fechaGT,
            items: item.map((a) => {
              console.log("1", a);
              const cantidadFinal =
                cantidades[a.d_sku_ecofiltro] ?? a.d_cantidad;
              return {
                modelo: a.d_sku_ecofiltro,
                descripcion: a.descripcion_ecofiltro,
                cantidad: cantidadFinal,
                precio: Number(a.d_precio_unitario_sinIva).toFixed(5),
                total: Number(a.d_total_linea_sinIva).toFixed(5),
                cc_departamento: orden.cliente.cc_departamento,
                cc_canal: orden.cliente.cc_canal,
                cc_vendedor: orden.cliente.cc_vendedor,
                // stock: disponible_bodega[a.d_sku_ecofiltro]?.Disponible ?? 0,
              };
            }),
          }
        : {
            tipoDoc,
            id,
            CardCode: orden.cliente.codigo_SAP,
            bodega: WhsCodeor,
            DocObjectCode: "oInvoices",
            ReserveInvoice: "tYES",
            para_tienda: orden.cliente.pedido_para_tienda,
            direccion_entrega,
            direccion: orden.cliente.direccion,
            U_DoctoNom: orden.cliente.nombre,
            U_FacNit: U_FacNit,
            U_OC: numeroPedido,
            U_Email: orden.cliente.Email,
            Phone1: Phone1,
            //date_oc: orden.cliente.fecha_oc,
            date_oc:fechaGT,
            items: item.map((a) => {
              console.log("2", a);
              const cantidadFinal =
                cantidades[a.d_sku_ecofiltro] ?? a.d_cantidad;
              return {
                modelo: a.d_sku_ecofiltro,
                descripcion: a.descripcion_ecofiltro,
                cantidad: cantidadFinal,
                precio: Number(a.d_precio_unitario_sinIva).toFixed(5),
                total: Number(a.d_total_linea_sinIva).toFixed(5),
                cc_departamento: orden.cliente.cc_departamento,
                cc_canal: orden.cliente.cc_canal,
                cc_vendedor: orden.cliente.cc_vendedor,
                // stock: disponible_bodega[a.d_sku_ecofiltro]?.Disponible ?? 0,
              };
            }),
          };

    return body;
  };

  const payload = buildPayload();

  const updateDocNumOrder = async (
    id,
    DocNum,
    tipoDocumento,
    U_V3_FCE_Enlace,
  ) => {
    console.log("enDetalle", U_V3_FCE_Enlace);
    try {
      const response = await updateUpdateDocNumOrder(
        id,
        DocNum,
        tipoDocumento,
        U_V3_FCE_Enlace,
      );
      SetAlert({
        ok: !response.ok,
        tipo: "info",
        text: response.message,
      });
    } catch (error) {
      SetAlert({
        ok: !error.response.data.ok,
        tipo: "warning",
        text: error.response.data.message,
      });
    }
  };

  const crear_ordenVenta = async () => {
    if (
      !window.confirm(
        tipoDoc == "oc"
          ? "Crear orden de venta en SAP"
          : "Crear factura de reserva en SAP",
      )
    )
      return;
    setActivateMessage(true);
    setMessages({
      types: "loading",
      contents: "Action in progress..",
      durations: 1,
    });
    setSkeleton(true);
    const response = await creacionDocumentoSap({ tipoDoc, payload });
    let respuesta;
    if (response.error == undefined) {
      respuesta = response.data[0];
    } else {
      respuesta = response.error;
    }

    if (!respuesta.ok) {
      setActivateMessage(true);
      setMessages({
        types: "error",
        contents: "Action in progress..",
        durations: 1,
      });
      setSkeleton(false);
      SetAlert({
        ok: respuesta.ok,
        tipo: "error",
        text: respuesta.message ? respuesta.message : "Revisa tus datos",
      });
    }

    if (respuesta.ok) {
      setActivateMessage(true);
      setSkeleton(false);
      setMessages({
        types: "success",
        contents: respuesta.message,
        durations: 5,
      });
      //put_pedidoHeaderCompleto_OV({id:datos_state.pedido.id, ordenDeVenta:datos_state.pedido.pedido, DocNum: response[3].DocNum});
      SetAlert({
        ok: respuesta.ok,
        tipo: "success",
        text: `OV creado exitosamente: DocEntry: ${respuesta.data.DocEntry}, DocNum: ${respuesta.data.DocNum}`,
      });
      const tipoDocumento =
        tipoDoc == "oc" ? "orden de venta" : "factura de reserva";
      const U_V3_FCE_Enlace = response?.data[0].data?.U_V3_FCE_Enlace;
      //const U_V3_FCE_Enlace = 'https://report.feel.com.gt/ingfacereport/ingfacereport_documento?uuid=7D1B95DC-0022-43B2-B5D0-E3F40E5C543A';
      const DocNum = response?.data[0]?.data?.DocNum;
      updateDocNumOrder(payload?.id, DocNum, tipoDocumento, U_V3_FCE_Enlace);
      setTimeout(() => {
        navigate("/h2h/OrdenDeVenta");
      }, 1000);
    }
  };
  const handleDeleteItem = async (model) => {
    if (!window.confirm("¿Eliminar este ítem?")) return;

    // luego eliminas
    desactivarItemc(model.id_detalle);

    setDetallePedido((prev) => {
      const newData = prev?.data?.data?.[0]?.filter(
        (item) => item.d_sku_cliente !== model.numero_oc,
      );

      return {
        ...prev,
        data: {
          ...prev.data,
          data: [newData],
        },
      };
    });
    //  LOG

    const cambios = {
      item: {
        antes: `${model.d_sku_ecofiltro} - ${model.d_descripcion_cliente}`,
        despues: "ELIMINADO",
      },
    };

    await postLogModificaicones({
      tabla: "orden_detalle",
      tipo_operacion: "DELETE",
      id_registro: model.id_detalle,
      referencia: numeroPedido,
      cambios: JSON.stringify(cambios),
      usuario: userName,
      origen: "WEB",
    });
  };

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields(); //  captura valores actuales

      await handleFinish(values); // reutilizas tu lógica
    } catch (error) {
      console.log("Errores de validación", error);
    }
  };

  const totalGeneral = item.reduce((acc, a) => {
    const cantidad = cantidades[a.d_sku_ecofiltro] ?? a.d_cantidad;

    const totalLinea = cantidad * Number(a.d_precio_unitario_sinIva);

    return acc + totalLinea;
  }, 0);
  return (
    <div className="p-6">
      {activateMessage ? (
        <Message
          types={messages.types}
          contents={messages.contents}
          durations={messages.durations}
        ></Message>
      ) : null}
      <ButtonCustom
        tooltip={alert.ok ? null : null}
        namebu="Buton Select"
        disabled={true}
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        text="<- Volver"
      />

      <h1 className="text-2xl font-semibold mb-6">
        Detalle Orden #{numeroPedido}
      </h1>
      {alert.ok ? <Alert alert={alert} /> : null}

      <Alert alert={alert} />
      {alert.ok ? (
        <ButtonCustom
          onClick={reconsultar}
          tooltip="true"
          disabled="false"
          text="Reconectar"
        />
      ) : null}

      <div className="bg-white shadow-md rounded-xl p-5 mb-5 overflow-x-auto">
        <Modal
          open={openLog}
          title="Log modificaciones"
          formulario="LogModificaciones"
          record={logModificaciones}
          //onCancel={() => setOpenLog(false)}
        />
        <h2 className="text-lg font-semibold mb-3">Información del Cliente</h2>
        <p>
          <strong>Código SAP:</strong> {orden.cliente.codigo_SAP}
        </p>
        <p>
          <strong>NIT/CUI:</strong> {orden.cliente.AdditionalID}
        </p>
        <p>
          <strong>Nombre:</strong> {orden.cliente.nombre}
        </p>
        <p>
          <strong>Teléfono:</strong> {orden.cliente.telefono}
        </p>
        <p>
          <strong>Dirección:</strong> {orden.cliente.direccion}
        </p>
        <p>
          <strong>Dirección Entrega:</strong> {orden.cliente.direccion_entrega}
        </p>
        <p>
          <strong>Para Tienda:</strong> {orden.cliente.pedido_para_tienda}
        </p>
        <p>
          <strong>Contacto:</strong> {orden.cliente.ContactPerson}
        </p>
        <p>
          <strong>Email:</strong> {orden.cliente.Email}
        </p>
        <p>
          <strong>DocNum:</strong> {orden.cliente.DocNum}
        </p>

        <Select
          placeholder="Seleccione bodega"
          disabled={alert.ok}
          tooltip={alert.ok ? null : { msj: alert.text, ok: alert.ok }}
          defaultValue="oc"
          options={tipoDocumento}
          onChange={setTipoDocumento}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div
            style={{
              background: "#f4f6f8",
              padding: "4px 10px",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <strong style={{ marginRight: 6 }}>Vendedor:</strong>
            {orden?.cliente?.Vendedor ?? "—"}
          </div>

          <div
            style={{
              background: "#f4f6f8",
              padding: "4px 10px",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <strong style={{ marginRight: 6 }}>Depto:</strong>
            {orden?.cliente?.name_cc_departamento ?? "—"}
          </div>

          <div
            style={{
              background: "#f4f6f8",
              padding: "4px 10px",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <strong style={{ marginRight: 6 }}>Canal:</strong>
            {orden?.cliente?.name_cc_canal ?? "—"}
          </div>

          <div
            style={{
              background: "#f4f6f8",
              padding: "4px 10px",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <strong style={{ marginRight: 6 }}>Vendedor:</strong>
            {orden?.cliente?.name_cc_vendedor ?? "—"}
          </div>
        </div>
      </div>

      {skelton ? (
        <Skeleton />
      ) : (
        <>
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-3">Ítems Solicitados</h2>

            <Select
              placeholder="Seleccione bodega"
              disabled={alert.ok}
              tooltip={alert.ok ? null : { msj: alert.text, ok: alert.ok }}
              defaultValue={
                datos_state?.pedido?.para_tienda == "006 Xela"
                  ? "Bodega65"
                  : "Bodega99"
              }
              options={options}
              onChange={setWhsCode}
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left mt-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">-</th>
                    <th className="py-2">sku cliente</th>
                    <th className="py-2">sku ecofiltro</th>
                    <th style={{ textAlign: "center" }}>Descripción</th>
                    <th style={{ textAlign: "center" }}>Bodega</th>
                    <th style={{ textAlign: "center" }}>En stock</th>
                    <th style={{ textAlign: "center" }}>Comprometido</th>
                    <th style={{ textAlign: "center" }}>Disponible SAP</th>
                    <th style={{ textAlign: "center" }}>Cant.</th>
                    <th style={{ textAlign: "center" }}>Precio sin Iva</th>
                    <th style={{ textAlign: "center" }}>Total sin Iva</th>
                    {/* <th style={{ textAlign: "center" }}>Departamento</th>
                    <th style={{ textAlign: "center" }}>Canal</th>
                    <th style={{ textAlign: "center" }}>Vendedor</th>
                    */}
                  </tr>
                </thead>
                <tbody>
                  {item.map((a, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2">
                        {!DocNum || !DocNum == "-" ? (
                          <button onClick={() => handleDeleteItem(a)}>
                            <DeleteOutlined />
                          </button>
                        ) : null}
                      </td>
                      <td className="py-2">{a.d_sku_cliente}</td>
                      <td className="py-2">{a.d_sku_ecofiltro}</td>
                      <td>{a.d_descripcion_ecofiltro}</td>
                      <td style={{ textAlign: "center" }}>{WhsCodeor}</td>
                      <td
                        className="font-semibold w-1/2 flex"
                        style={{
                          textAlign: "center",
                          color:
                            disponible_bodega[a.d_sku_ecofiltro]?.En_stock > 0
                              ? ""
                              : "red",
                        }}
                      >
                        {disponible_bodega[a.d_sku_ecofiltro]?.En_stock > 0
                          ? Math.trunc(
                              disponible_bodega[a.d_sku_ecofiltro]?.En_stock,
                            )
                          : 0}
                      </td>
                      <td
                        className="font-semibold w-auto"
                        style={{
                          textAlign: "center",
                          color:
                            disponible_bodega[a.d_sku_ecofiltro]?.Comprometido >
                            0
                              ? ""
                              : "red",
                        }}
                      >
                        {disponible_bodega[a.d_sku_ecofiltro]?.Comprometido > 0
                          ? Math.trunc(
                              disponible_bodega[a.d_sku_ecofiltro]
                                ?.Comprometido,
                            )
                          : 0}
                      </td>
                      <td
                        className="font-semibold w-auto"
                        style={{
                          textAlign: "center",
                          color:
                            disponible_bodega[a.d_sku_ecofiltro]?.Disponible > 0
                              ? ""
                              : "red",
                        }}
                      >
                        {disponible_bodega[a.d_sku_ecofiltro]?.Disponible > 0
                          ? Math.trunc(
                              disponible_bodega[a.d_sku_ecofiltro]?.Disponible,
                            )
                          : 0}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          disabled={!DocNum || !DocNum == "-" ? false : true}
                          name="cantidad_mod w-auto"
                          onChange={(e) =>
                            cambiarCantidad(e, a.d_sku_ecofiltro, a.d_cantidad)
                          }
                          style={{
                            textAlign: "center",
                            background:
                              disponible_bodega[a.d_sku_ecofiltro]?.En_stock >
                              a.d_cantidad
                                ? "#60d394"
                                : "#ffcad4",
                            color:
                              disponible_bodega[a.d_sku_ecofiltro]?.En_stock >
                              a.d_cantidad
                                ? "#004b23"
                                : "#6a040f",
                          }}
                          type="number"
                          defaultValue={a.d_cantidad}
                        ></input>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        Q{a.d_precio_unitario_sinIva}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        Q
                        {Number(
                          !Math.trunc(cantidades[a.d_sku_ecofiltro], 0)
                            ? a.d_total_linea_sinIva
                            : cantidades[a.d_sku_ecofiltro] *
                                a.d_precio_unitario_sinIva,
                        ).toLocaleString("es-GT", {
                          minimumFractionDigits: 5,
                          maximumFractionDigits: 5,
                        })}
                      </td>
                      {/* <td style={{ textAlign: "center" }}>{a.cc_departamento}</td>
                      <td style={{ textAlign: "center" }}>{a.cc_canal}</td>
                      <td style={{ textAlign: "center" }}>{a.cc_vendedor}</td>*/}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr
                    style={{
                      background: "#f4f6f8",
                      fontWeight: "bold",
                    }}
                  >
                    <td
                      colSpan="10"
                      style={{ textAlign: "right", padding: 10 }}
                    >
                      TOTAL GENERAL:
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        padding: 10,
                        color: "#004b23",
                        fontSize: 16,
                      }}
                    >
                      Q{totalGeneral.toFixed(5)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {!DocNum || !DocNum == "-" ? (
            <ButtonCustom
              tooltip={alert.ok ? null : { msj: alert.text, ok: alert.ok }}
              namebu="Buton Crear OT"
              onClick={crear_ordenVenta}
              text={
                tipoDoc == "oc"
                  ? "Crear orden de venta"
                  : "Crear factura de reserva"
              }
              type="primary"
              disabled={alert.ok ? alert.ok : "false"}
            />
          ) : (
            <ButtonCustom text={DocNum} />
          )}
        </>
      )}
    </div>
  );
}
