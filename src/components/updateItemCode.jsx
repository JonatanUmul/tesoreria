import { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchCrearSocioDeNegocio } from "../services/socioDeNegocio.service";
import { updateItem, getItemcodeId } from "../services/itemCode.service";
import Confirm from "../components/Confirm"
import Alert from "./Alert";

const { Option } = Select;

const FormSocioNegocio = ({ record, onSuccess }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const idItemCode = record?.id;

  //  Cargar datos actuales
  const loadItemCode = async () => {
    try {
      setLoading(true);

      const response = await getItemcodeId(idItemCode);
      const data = response.data.data[0];

      // LLENAR FORMULARIO (CLAVE)
      form.setFieldsValue({
        id: data.id,
        cardCode: data.cardCode_cadena,
        cadena: data.name_cadena,
        sku_cliente: data.sku_cliente || "",
        descripcion_cliente: data.descripcion_cliente,
        sku_ecofiltro: data.sku_ecofiltro,
        descripcion_ecofiltro: data.descripcion_ecofiltro,
        estado: data.estado || "activo",
        precio_sinIva: data.precio_sinIva || 0,
      });

    } catch (error) {
      setAlert({
        ok: false,
        tipo: "error",
        text: error?.response?.data?.message || "Error cargando datos",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idItemCode) {
      loadItemCode();
    }
  }, [idItemCode]);

  //  Guardar cambios
  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const response = await updateItem(values);
      console.log('res',response)
      
      setAlert({
        ok: true,
        tipo: "success",
        text: response?.data?.message || "Actualizado correctamente",
      });
      onSuccess()
  
    } catch (error) {
      setAlert({
        ok: false,
        tipo: "error",
        text: error?.response?.data?.message || "Error al guardar",
      });
    } finally {
      setLoading(false);
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
      {alert && <Alert alert={alert} />}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >

        <Form.Item
          label="id"
          name="id"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input disabled />

        </Form.Item>
        <Form.Item
          label="CardCode"
          name="cardCode"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cadena"
          name="cadena"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sku Cliente"
          name="sku_cliente"
          rules={[{ required: true, message: "Requerido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Descripción Cliente" name="descripcion_cliente">
          <Input />
        </Form.Item>

        <Form.Item label="Sku Ecofiltro" name="sku_ecofiltro">
          <Input />
        </Form.Item>

        <Form.Item label="Descripción Ecofiltro" name="descripcion_ecofiltro">
          <Input />
        </Form.Item>
        
        <Form.Item label="Precio sin Iva" name="precio_sinIva">
          <Input />
        </Form.Item>


        <Form.Item
          label="Estado"
          name="estado"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="activo">Activo</Option>
            <Option value="inactivo">Inactivo</Option>
          </Select>
        </Form.Item>
  <Confirm
  title="Confirmación"
  description="¿Estás seguro de actualizar los datos?"
  label="Actualizar"
  onConfirm={handleConfirm}
/>    

      </Form>
    </>
  );
};

export default FormSocioNegocio;