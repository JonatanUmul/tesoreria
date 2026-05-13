import React from 'react';
import { FileExcelOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx'; // Importar todas las exportaciones de xlsx
//import { formatFecha } from '../../../utilidades/FormatearFecta';

const ExcelROTHP = ({ datos }) => {
    console.log('excel',datos)
    const dat = datos?.data?.data[0]
  const generarExcel = () => {
    // Crear una nueva hoja de cálculo de Excel
    const wb = XLSX.utils.book_new();

    // Agregar los encabezados a los datos
    const dataWithHeaders = [
  ...dat.map(dato=>({
    fecha_oc:dato.fecha_oc,
    cardCode: dato.cardCode,
    DocNum: dato.DocNum,
    nombre: dato.nombre,
    numero_oc: dato.numero_oc,
    d_sku_ecofiltro:dato.d_sku_ecofiltro,
    d_descripcion_ecofiltro: dato.d_descripcion_ecofiltro,
    d_cantidad: dato.d_cantidad,
    d_precio_unitario_sinIva:dato.d_precio_unitario_sinIva,
    d_total_linea_sinIva:dato.d_total_linea_sinIva
  }))
    ];

    // Crear una nueva hoja en la hoja de cálculo de Excel
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Agregar la hoja a la hoja de cálculo de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'Ordenes_Cadenas');

    // Guardar el archivo Excel
    const fileName = `Ordenes_Cadenas.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><FileExcelOutlined /></button>
    </div>
  );
};

export default ExcelROTHP;
