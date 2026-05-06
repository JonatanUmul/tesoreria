import { useEffect, useState } from "react";

function VerPDF({ URL_PDF }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const cargarPDF = async () => {
      try {
        const res = await fetch(URL_PDF);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error("Error cargando PDF", err);
      }
    };

    cargarPDF();
  }, [URL_PDF]);

  return pdfUrl ? (
    <iframe
      src={pdfUrl}
      width="100%"
      height="700px"
      style={{ border: "none" ,width: "100%",
        height: "100%",}}
    />
  ) : (
    <p>Cargando PDF...</p>
  );
}

export default VerPDF;