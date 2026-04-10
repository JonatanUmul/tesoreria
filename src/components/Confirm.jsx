import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
const Confirm = ({ title, description, label, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
const handleOk = async () => {
  try {
    setConfirmLoading(true);

    await onConfirm();

    setOpen(false);
  } catch (error) {
    console.log(error);
  } finally {
    setConfirmLoading(false);
  }
};
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

const stylesFn = info => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        borderRadius: 4,
      },
      title: {
        color: '#fff',
      },
      content: {
        color: '#fff',
      },
    };
  }
  return {};
};
  return (
    <Popconfirm
    style={stylesFn}
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        {label}
      </Button>
    </Popconfirm>
  );
};
export default Confirm;