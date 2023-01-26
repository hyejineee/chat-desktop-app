/* eslint-disable react/jsx-no-useless-fragment */
import { useAlertMessage } from '@contexts/AlertMessageContext';
import { message } from 'antd';
import { useEffect } from 'react';

export default function AlertMessage() {
  const alertMessage = useAlertMessage();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (alertMessage?.visible) {
      messageApi.open({
        type: alertMessage.type,
        content: alertMessage.content,
      });
    }
  }, [alertMessage, messageApi]);

  return <>{contextHolder}</>;
}
