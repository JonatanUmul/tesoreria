import React from "react";
import { Button, Popover } from "antd";

const ButtonCustom = ({
  tooltip,
  text,
  icon,
  shape,
  type,
  danger = false,
  onClick,
  loading = false,
  style,
  disabled,
  htmlType,
  variant,
  color,
  block,
}) => {

  return (
  tooltip?.ok ?   
  <Button
      htmlType={htmlType}
      shape={shape}
      type={type}
      icon={icon}
      danger={danger}
      loading={loading}
      onClick={onClick}
      variant={variant}
      color={color}
      block={block}
      style={{
        borderRadius: "8px",
        fontWeight: 500,

        ...style,
      }}
      disabled={disabled ? false : true}
    >
      {text}
    </Button>:
    <Popover content={tooltip?.msj} title="Mensaje">
    <Button
      htmlType={htmlType}
      shape={shape}
      type={type}
      icon={icon}
      danger={danger}
      loading={loading}
      onClick={onClick}
      variant={variant}
      color={color}
      block={block}
      style={{
        borderRadius: "8px",
        fontWeight: 500,

        ...style,
      }}
      disabled={disabled ? false : true}
    >
      {text}
    </Button>
    </Popover>
  );
};

export default ButtonCustom;
