import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  FileSearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Form, Upload } from "antd";
import Ocemaco from "../services/ocemaco.service ";
import Oc_pdf from "../services/oc_pdf.service";
import DetallePedido from "../components/DetallePedido";
import Pdfviewer_modal from "../components/Pdfviewer_modal";
import Excelviewer from "../components/Excelviewer_modal";
import ButtonCustom from "../components/ButtonCustom";
import Message from "../components/Message.jsx";
import Alert from "../components/Alert.jsx";
import { useNavigate } from "react-router-dom";
import CrearOvEnMysql from "../services/crearOvEnMysql";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo = () => {
  const navigate = useNavigate();
  const [componentDisabled, setComponentDisabled] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [tipoFile, setTipoFile] = useState("");
  const [datosOC, setDatosOC] = useState([]);
  const [dats, setDatos] = useState([]);
  const [skelton, setSkeleton] = useState(false);
  const [messages, setMessages] = useState({});
  const [alert, SetAlert] = useState({});
  const [activateMessage, setActivateMessage] = useState(false);
  const a = dats || [];
console.log('datos',datosOC)
  const RemoveFile = () => {
    setFileUpload(null);
  };

  //Cada vez que el valor en el fileUpload cambie se limpua el estado llamando a la función RemoveFile()
  useEffect(() => {
    RemoveFile();
  }, [fileUpload]);

  const props = {
    accept: ".xls, .xlsx, .pdf",
    name: "file",
    maxCount: 1,
    headers: {
      authorization: "authorization-text",
    },
    //Funcion para remover el archivo en el input
    onRemove: RemoveFile,
    onChange(info) {
      console.log("file", info);
      //Con mime capturamos el tipo de archivo: pdf, excel, etc
      const mime = info.file.type;
      setTipoFile(mime);
      setComponentDisabled(info);
      if (mime.includes("excel")) {
        if (info.file.status !== "uploading") {
          let reader = new FileReader();
          reader.onload = (e) => {
            setDatos(e?.target?.result);
          };
          reader.readAsText(info.file.originFileObj);
        }

        setFileUpload(info.file.originFileObj);
      } else if (mime.includes("pdf")) {
        setDatos([]);
        setDatosOC([]);
        setFileUpload(info.file.originFileObj);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //Funcion para enciar el archivo al backend
  const Enviar = async () => {
    try {
      //Desición para enviar el archivo a cada endpoint si es pdf o excel
      if (tipoFile.includes("excel")) {
        const response = await Ocemaco(a);
        setDatosOC(response.data.result.output);
      } else {
        const response = await Oc_pdf(fileUpload);
        setDatosOC(response.data.response.output);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Regresar = () => {
    navigate("/h2h/OrdenDeVenta");
  };

    const cleanData = typeof datosOC === "string"
  ? datosOC.replace(/```json|```/g, "").trim()
  : datosOC;
  
  const parsedDat = typeof cleanData === "string" ? JSON.parse(cleanData) : cleanData;
  console.log('datosss',  parsedDat)

  const buildPayload = () => {
    return {
      pedido: parsedDat?.header?.Pedido,
      cod_sap: parsedDat?.header?.CardCode,
      CardName: parsedDat?.header?.CardName,
      fecha: parsedDat?.header?.Fecha,
      preparado_por: parsedDat?.header?.Preparado_por,
      Pedido_para_tienda: parsedDat?.header?.Pedido_para_tienda,
      estado: "Pendiente",

      items: parsedDat?.items?.map((a) => {
        return {
          pedido: parsedDat.header.Pedido,
          sku: a.SKU,
          modelo: a.Modelo,
          Descripcion: a.Descripcion,
          cantidad: a.Cantidad,
          costo: a.Costo,
        };
      }),
    };
  };
  const payload = buildPayload();

  const CrearOvMysql = async () => {
    try {
      setActivateMessage(true);
      const response =await CrearOvEnMysql({ payload });
      console.log('trye catsc',response)
      setMessages({
        types: "loading",
        contents: "Action in progress..",
        durations: 1,
      });
      setSkeleton(true);
    } catch (error) {
      setActivateMessage(true);
      setMessages({
        types: "error",
        contents: "Action in progress..",
        durations: 1,
      });
      setSkeleton(false);
      SetAlert({
        ok: false,
        tipo: "error",
        text: response?.error?.message,
      });
    }
  };
  return (
    <div className="scroll-smooth">
      {activateMessage ? (
        <Message
          types={messages.types}
          contents={messages.contents}
          durations={messages.durations}
        ></Message>
      ) : null}
       {alert.ok ? <Alert alert={alert} /> : null}
      <Form
        className="w-full mt-5"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        {/*Botón para cargar el archivo */}
        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload {...props}>
            <ButtonCustom
              tooltip={{ ok: "false" }}
              disabled="false"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              text="New Upload"
              icon={<PlusOutlined />}
            />
          </Upload>
          <ButtonCustom
            tooltip={{ ok: "false" }}
            disabled="false"
            type="dashed"
            className=""
            text="Regresar"
            variant="solid"
            onClick={Regresar}
          />

          <ButtonCustom
            tooltip={{ ok: "false" }}
            text={"Extraer Datos"}
            //disabled={fileUpload ? false : true}
            disabled="false"
            type="primary"
            htmlType="submit"
            onClick={Enviar}
            shape="circle"
            icon={<FileSearchOutlined />}
            style={{ padding: 10, margin: 10 }}
          />
          <ButtonCustom
            onClick={CrearOvMysql}
            tooltip={{ ok: "false" }}
            disabled="false"
            text="Crear OV"
          />

          {/*Si es pdf muestra el botón de PDF caso contrario el de excel*/}
          {tipoFile.includes("pdf") ? (
            fileUpload ? (
              <Pdfviewer_modal file={fileUpload} nameButton="Ver PDF" />
            ) : null
          ) : fileUpload ? (
            <Excelviewer file={fileUpload} nameButton="Ver Excel" />
          ) : null}
        </Form.Item>
      </Form>
      {/*Componente para mostrar el detalle del pedido */}
      <div className="flex justify-center w-full mt-8 scroll-smooth">
        <div className="w-full max-w-5xl">
          <DetallePedido data={datosOC} />
        </div>
      </div>
    </div>
  );
};
export default () => <FormDisabledDemo />;
