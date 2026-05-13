const imprimirFactura = (urlPdf) => {
  console.log('sdfg',urlPdf)
  const iframe = document.createElement("iframe");


  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  iframe.src = urlPdf;

  document.body.appendChild(iframe);

  iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
};

export default imprimirFactura