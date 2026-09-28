import React from 'react';
import { FileExcelOutlined } from "@ant-design/icons";
//import { formatFecha } from '../../../utilidades/FormatearFecta';

const ExcelROTHP = ({ datos }) => {
    const dat = datos?.data?.data?.[0] || [];

  const escapeCsv = (value) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const generarExcel = () => {
    const dataWithHeaders = dat.map(dato=>({
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
  }));

    if (dataWithHeaders.length === 0) return;

    const headers = Object.keys(dataWithHeaders[0]);
    const rows = dataWithHeaders.map((row) =>
      headers.map((header) => escapeCsv(row[header])).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Ordenes_Cadenas.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button className="btn" onClick={generarExcel}><FileExcelOutlined /></button>
    </div>
  );
};

export default ExcelROTHP;
