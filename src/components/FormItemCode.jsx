// components/FormItemCode.jsx
import { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Card, message } from "antd";
import { fetchItemCode } from "../services/itemCode.service";
import SelectSocioNegocio from '../components/Select'
import Confirm from "../components/Confirm"
import Alert from "../components/Alert"
import SelectGrupoArticulo from "../components/Select"

const { Option } = Select;

const FormItemCode = ({ socioDeNegocio, onSuccess }) => {
  console.log('sn',socioDeNegocio)
  const [form] = Form.useForm();
  const [alert, SetAlert] = useState({});
  const grupoArticulo =[
   {value:'suministro', label:'Suministro'},
   {value:'productoTerminado', label:'Producto Terminado'}
    ]
  const handleFinish = async (values) => {
    console.log(values)
    try {
      const respuesta=await fetchItemCode(values)
      
      //message.success("Registro guardado correctamente");
         SetAlert({
        ok: respuesta.data.ok,
        tipo: "success",
        text: respuesta.data.message,
      });
      form.resetFields();
      onSuccess()
    } catch (error) {
      SetAlert({
        ok: !error.response.data.ok,
        tipo: "warning",
        text: error.response.data.message,
      });
    }
  };

    const handleConfirm = async () => {
  try {
    const values = await form.validateFields(); //  captura valores actuales

    await handleFinish(values); // reutilizas tu lógica
  } catch (error) {
    console.log("Errores de validación", error);
  }
};

  return (
      <>
        {alert.ok ? <Alert alert={alert} /> : null}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="CardCode Cadena"
          name="cardCode_cadena"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
        <SelectSocioNegocio 
          defaultValue={'C00162'}
          options={socioDeNegocio[0]} 
          disabled={false} 
          placeholder='Cliente' 
          //onChange={setTienda}
        />
        </Form.Item>

        <Form.Item
          label="SKU Cliente"
          name="sku_cliente"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input placeholder="Ej: 939013" />
        </Form.Item>

        <Form.Item
          label="Descripción Cliente"
          name="descripcion_cliente"
        >
          <Input placeholder="Descripción del cliente" />
        </Form.Item>

        <Form.Item
          label="SKU Ecofiltro"
          name="sku_ecofiltro"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input placeholder="Ej: ECO600000" />
        </Form.Item>
        <Form.Item label="Grupo de articulo" name="grupoArticulo" rules={[{ required: true, message: "Requerido" }]}>
          <SelectGrupoArticulo 
          options={grupoArticulo} 
          disabled={false} 
          placeholder='Grupo'
         // onChange={setGrupo}
          />
        </Form.Item>
        <Form.Item
          label="Descripción Ecofiltro"
          name="descripcion_ecofiltro"
        >
          <Input placeholder="Descripción interna" />
        </Form.Item>

        <Form.Item
          label="Precio sin IVA"
          name="precio_siniva"
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            step={0.01}
            placeholder="Ej: 100.00"
          />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="estado"
          initialValue="activo"
        >
          <Select>
            <Option value="activo">Activo</Option>
            <Option value="inactivo">Inactivo</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Confirm
  title="Confirmación"
  description="¿Estás seguro de guardas los datos?"
  label="Guardar"
  onConfirm={handleConfirm}
/>   
        </Form.Item>

      </Form>
      </>

  );
};

export default FormItemCode;