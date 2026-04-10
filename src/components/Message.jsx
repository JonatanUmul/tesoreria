import { useEffect } from "react";
import { Button, message } from "antd";
import { useEffectEvent } from "react";
const Message = ({ types, contents, durations }) => {
  console.log("Propr llegando a Message", types, contents, durations);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
          .open({
            type:types,
            content:contents,
            duration: parseInt(durations),
          })
  };

  useEffect(() => {
    success();
  }, [types, contents, durations]);
  return <>{contextHolder}</>;
};
export default Message;
