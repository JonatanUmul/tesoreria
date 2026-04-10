import React from "react";
import { Select, Popover } from "antd";

const SelectReusable = ({ options, value, onChange, defaultValue, disabled, tooltip, placeholder}) => {

  const selectStyle = {
    width: "220px",
    borderRadius: "8px",
  }

  const selectComponent = (
    <Select
      disabled={disabled}
      showSearch
      optionFilterProp="label"
      placeholder={placeholder}
      options={options}
      value={value}
      defaultValue={defaultValue}
      onChange={(val) => onChange(val)}
      allowClear
      style={selectStyle}
    />
  );

  return tooltip?.ok ? (
    selectComponent
  ) : (
    <Popover content={tooltip?.msj} title="Mensaje">
      {selectComponent}
    </Popover>
  );
};

export default SelectReusable;