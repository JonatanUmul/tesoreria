// components/FormSocioNegocio.jsx
import { useState } from "react";
import { Form, Input, Button, Select, Card } from "antd";
import { fetchCrearSocioDeNegocio } from "../services/socioDeNegocio.service";
import Confirm from "../components/Confirm"
import Alert from "./Alert";

const { Option } = Select;

const FormSocioNegocio = ({onSuccess}) => {
  const [form] = Form.useForm();
  const [alert, SetAlert] = useState({});

  const handleFinish = async (values) => {
    try {
      const respuesta =await fetchCrearSocioDeNegocio(values)
      onSuccess()
      SetAlert({
        ok: true,
        tipo: "success",
        text: respuesta?.data?.message,
      });

      form.resetFields();
    } catch (error) {
      console.log('error aca',error.response.data)
      SetAlert({
        ok: false,
        tipo: "warning",
        text: error?.response?.data?.message || "Error",
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
      {alert.ok !== undefined && <Alert alert={alert} />}

      <Form form={form} layout="vertical" onFinish={handleFinish}>

        <Form.Item
          label="CardCode"
          name="cardCode"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input placeholder="Ej: C00162" />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input placeholder="Ej: CEMACO S.A." />
        </Form.Item>

        <Form.Item 
        label="NIT" 
        name="nit"
        rules={[{ required: true, message: "Requerido" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Teléfono" name="telefono">
          <Input />
        </Form.Item>

        <Form.Item label="Dirección" name="direccion">
          <Input />
        </Form.Item>

        <Form.Item label="Correo" name="correo">
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Estado" name="estado" initialValue="activo">
          <Select>
            <Option value="activo">Activo</Option>
            <Option value="inactivo">Inactivo</Option>
          </Select>
        </Form.Item>

          <Confirm
  title="Confirmación"
  description="¿Estás seguro de guardas los datos?"
  label="Guardar"
  onConfirm={handleConfirm}
/>  

      </Form>
      </>

  );
};

export default FormSocioNegocio;