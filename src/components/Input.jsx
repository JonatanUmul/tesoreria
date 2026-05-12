import { Input } from "antd";

const App = ({ handleChange, style, type, placeholder, defaulValue }) => (
  <Input
    defaultValue={defaulValue}
    type={type}
    onChange={handleChange}
    placeholder={placeholder}
    style={{ width: "100%", maxWidth: 250, ...style }}
  />
);

export default App;