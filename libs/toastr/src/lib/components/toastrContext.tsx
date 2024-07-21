import { Box } from '@mui/material';
import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import NotificationList from './NotificationList';
import { isCustomContent } from './toastUtils';
import {
  CustomNotification,
  CustomNotificationProps,
  GlobalConfigs,
  NewNotification,
  Notification,
  ToastNotification,
  ToastrContextProps,
} from '../../types';

const ToastrContext = createContext<ToastrContextProps | undefined>(undefined);

export const useToastr = (): ToastrContextProps => {
  const context = useContext(ToastrContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface ToastrProviderProps extends PropsWithChildren {
  configs?: Partial<GlobalConfigs>;
}
const DEFAULT_CONFIGS: GlobalConfigs = {
  disableDecendantStyle: false,
  disableDismissAll: false,
  restartTimeoutAferHover: true,
  timeout: 2000, //3s [2,1,0]
};

export const ToastrProvider: React.FC<ToastrProviderProps> = ({
  children,
  configs: {
    disableDecendantStyle,
    disableDismissAll,
    timeout: toastTimeout,
    restartTimeoutAferHover,
  } = {},
}) => {
  const [globalConfigs, setGlobalConfigs] =
    useState<GlobalConfigs>(DEFAULT_CONFIGS);

  useEffect(() => {
    setGlobalConfigs({
      disableDecendantStyle:
        disableDecendantStyle ?? DEFAULT_CONFIGS.disableDecendantStyle,
      disableDismissAll: disableDismissAll ?? DEFAULT_CONFIGS.disableDismissAll,
      timeout: toastTimeout ?? DEFAULT_CONFIGS.timeout,
      restartTimeoutAferHover:
        restartTimeoutAferHover ?? DEFAULT_CONFIGS.restartTimeoutAferHover,
    });
  }, [
    disableDecendantStyle,
    disableDismissAll,
    restartTimeoutAferHover,
    toastTimeout,
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  function toast(message: JSX.Element, props?: CustomNotificationProps): void;
  function toast(
    message: string | number | boolean | undefined,
    props?: NewNotification
  ): void;
  function toast(
    message: ReactNode,
    props?: NewNotification | CustomNotificationProps
  ) {
    const id = crypto.randomUUID();
    let newToast: Notification;
    if (isCustomContent(message)) {
      newToast = {
        id,
        content: message,
      } as CustomNotification;
    } else {
      newToast = {
        id,
        ...props,
        message: String(message),
      } as ToastNotification;
    }
    setNotifications((prev) => [newToast, ...prev]);
  }

  const clearToast = (id?: string) => {
    if (!id) return setNotifications([]);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <ToastrContext.Provider
      value={{
        notifications,
        globalConfigs,
        toast,
        clearToast,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
        }}
      >
        <NotificationList />
        {children}
      </Box>
    </ToastrContext.Provider>
  );
};
