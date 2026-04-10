import { Alert } from "antd";
const App = (alert) => {
  console.log('props',alert)
  const { tipo, text } = alert.alert;
  console.log('succes',tipo, text);
  return (
    <div style={{padding:10, color:'balck'}}>
      <Alert message={String(text)} type={tipo}/>
    </div>
  );
};
export default App;
