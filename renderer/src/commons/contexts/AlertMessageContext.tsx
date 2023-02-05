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

  return {
    alertMessage,
    showAlertMessage,
  };
};

export const [AlertMessageProvider, useAlertMessage, useShowAlertMessage] =
  constate(
    useAlertMessageContext,
    value => value.alertMessage,
    value => value.showAlertMessage,
  );
