
import React, { createContext, useEffect, useState } from 'react';

type TAlert = {
  isOpen: boolean;
  messages: {
    id: string;
    message: string;
    title: string;
    type: 'info' |'success' | 'warning' | 'error';
  }[];
};

type TAlertContext = {
    alert: TAlert;
    setAlert: React.Dispatch<React.SetStateAction<TAlert>>
}
const AlertContext = createContext<TAlertContext | null>(null);

export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [alert, setAlert] = useState<TAlert>({
    isOpen: false,
    messages: [
        {
            id: '',
            message: '',
            title: '',
            type: 'info', 
        }
    ],
  })

  useEffect(() => {

  }, [alert.isOpen, alert.messages]);



  return (
    <AlertContext.Provider value={{alert, setAlert}}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;