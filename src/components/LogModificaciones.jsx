import React from "react";

const LogAuditoria = ({ record }) => {
  const data = Array.isArray(record) ? record : record ? [record] : [];

  const renderCambios = (cambios) => {
    console.log('desde log',cambios)
    try {
      const parsed =
        typeof cambios === "string" ? JSON.parse(cambios) : cambios;

      return Object.keys(parsed).map((campo, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#f9fafb",
            padding: "8px 12px",
            borderRadius: "8px",
            marginBottom: "6px",
            border: "1px solid #eee",
          }}
        >
          <span style={{ fontWeight: 500 }}>{campo}</span>

          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ color: "#999" }}>
              {parsed[campo]?.antes ?? "—"}
            </span>

            <span style={{ color: "#ccc" }}>→</span>

            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
              {parsed[campo]?.despues ?? "—"}
            </span>
          </div>
        </div>
      ));
    } catch {
      return <span style={{ color: "red" }}>Error al leer cambios</span>;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f4f6f8",
        minHeight: "100%",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#0f4c81" }}>
        Historial de Modificaciones
      </h2>

      {data.length === 0 && (
        <p style={{ color: "#777" }}>No hay registros</p>
      )}

      {data.map((log) => (
        <div
          key={log.id}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <strong>OC:</strong> {log.referencia}
            </div>

            <div
              style={{
                background: "#0f4c81",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              {log.tipo_operacion}
            </div>
          </div>

          {/* INFO */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              fontSize: "12px",
              color: "#666",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <span><strong>Usuario:</strong> {log.usuario}</span>
            <span><strong>Origen:</strong> {log.origen}</span>
            <span>
              <strong>Fecha:</strong>{" "}
              {new Date(log.fecha).toLocaleString()}
            </span>
          </div>

          {/* CAMBIOS */}
          <div>{renderCambios(log.cambios)}</div>
        </div>
      ))}
    </div>
  );
};

export default LogAuditoria;