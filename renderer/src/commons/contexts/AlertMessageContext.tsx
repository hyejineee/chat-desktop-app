import constate from 'constate';
import { useState } from 'react';

const useAlertMessageContext = () => {
  const [alertMessage, setAlertMessage] = useState<{
    visible: boolean;
    type: 'error' | 'success' | 'warning';
    content: string;
  } | null>(null);

  const showAlertMessage = (
    type: 'error' | 'success' | 'warning',
    content: string,
  ) => {
    setAlertMessage({
      visible: true,
      type,
      content,
    });
  };

  const hideAlertMessage = () => {
    setAlertMessage({
      visible: false,
      type: 'error',
      content: '',
    });
  };

  return {
    alertMessage,
    showAlertMessage,
    hideAlertMessage,
  };
};

export const [
  AlertMessageProvider,
  useAlertMessage,
  useShowAlertMessage,
  useHideAlertMessage,
] = constate(
  useAlertMessageContext,
  value => value.alertMessage,
  value => value.showAlertMessage,
  value => value.hideAlertMessage,
);
