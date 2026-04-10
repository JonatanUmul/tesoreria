import { useState } from "react";
import { Card, Table, Descriptions, Typography } from "antd";
import ButtonCustom from "./ButtonCustom";

const { Title, Text} = Typography;

const DetallePedido = ({ data }) => {

   const [skelton, setSkeleton] = useState(false);
   const [alert, SetAlert] = useState({});
   const cleanData = typeof data === "string"
   ? data.replace(/```json|```/g, "").trim()
   : data;
  
  const parsedData = typeof cleanData === "string" ? JSON.parse(cleanData) : cleanData;
  console.log('datosss',  parsedData)

  



  const items = parsedData?.items?.map((item, index) => ({
    key: index,
    CardName: item["CardName"],
    CardCode: item["CardCode"],
    position: item["Posición"],
    sku: item["SKU"],
    model: item["Modelo"],
    description: item["Descripcion"],
    quantity: item["Cantidad"],
    unit_cost: item["Costo"],
    total_item_cost: item["Total"],
  }));

  if (!parsedData) return <p>No hay datos disponibles</p>;

  const columns = [
    //{ title: "Posición", dataIndex: "position", key: "Posicion" },
   // { title: "CardName", dataIndex: "CardName", key: "CardName" },
    { title: "SKU", dataIndex: "sku", key: "sku" },
   // { title: "CardCode", dataIndex: "CardCode", key: "CardCode" },
    { title: "Modelo", dataIndex: "model", key: "model" },
    { title: "Descripción", dataIndex: "description", key: "description" },
    { title: "Cantidad", dataIndex: "quantity", key: "quantity" },
    { title: "Costo Unitario", dataIndex: "unit_cost", key: "unit_cost" },
    { title: "Total Línea", dataIndex: "total_item_cost", key: "total_item_cost" },
  ];

  return (
    <div className="w-full h-full shadow-md scroll-smooth" style={{ padding: 24, minHeight: "100vh" }}>
      <Card className="shadow-md"
        style={{ marginBottom: 24 }}
        title={
          <Title level={3} style={{ margin: 0 }}>
            Detalle del Pedido #{parsedData?.header?.Pedido}
          </Title>
        }
      >
        
        <Descriptions className="shadow-lg" bordered column={2}>
          <Descriptions.Item label="Cliente">
            {parsedData?.header?.Pedido}
          </Descriptions.Item>
          <Descriptions.Item label="CardName">
            {parsedData?.header?.CardName}
          </Descriptions.Item>
          <Descriptions.Item label="CardCode">
            {parsedData?.header?.CardCode}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha">
            {parsedData?.header?.Fecha}
          </Descriptions.Item>
          <Descriptions.Item label="Preparado por">
            {parsedData?.header?.Preparado_por}
          </Descriptions.Item>
          <Descriptions.Item label="Tienda">
            {parsedData?.header?.Pedido_para_tienda}
          </Descriptions.Item>

          <Descriptions.Item label="Proveedor" span={2}>
            {parsedData?.supplier?.Nombre_Proveedor} — {data?.supplier?.Codigo_Proveedor}
          </Descriptions.Item>
          <Descriptions.Item label="Dirección proveedor" span={2}>
            {parsedData?.supplier?.Direccion_Proveedor}
          </Descriptions.Item>
          <Descriptions.Item label="Teléfono proveedor">
            {parsedData?.supplier?.Telefono_Proveedor}
          </Descriptions.Item>

          <Descriptions.Item label="Entrega a">
            {parsedData?.delivery?.Sirvase_suministrar_a}
          </Descriptions.Item>
          <Descriptions.Item label="Dirección entrega">
            {parsedData?.delivery?.Direccion_ATLAS}
          </Descriptions.Item>
          <Descriptions.Item label="Teléfono recepción">
            {parsedData?.delivery?.Telefono_recepcion}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="shadow-lg shadow-card" title="Ítems del pedido">
        <Table 
          className="top-0 right-0 overflow-auto overflow-x-scroll focus:ring-blue-500 h-2/3"
          columns={columns}
          dataSource={items}
          pagination={false}
          bordered
          rowKey="key"
        />

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Title className="h-auto" level={4}>
            Total general:{" "}
            {/*  <Text strong style={{ color: "#1890ff" }}>
              Q{parsedData?.summary?.Totales?.toFixed(2)}
            </Text>*/}
          </Title>
        </div>
      </Card>

      <Card
        title="Observaciones"
        style={{ marginTop: 24 }}
      >
        <Text style={{ whiteSpace: "pre-line" }}>{parsedData?.observations}</Text>
      </Card>
    </div>
  );
};

export default DetallePedido;
