export interface IToast {
  type: 'success' | 'info' | 'error';
  title?: string;
  message: string;
  hasIcon?: boolean;
  hasCloseButton?: boolean;
  action?: () => void;
  actionButton?: JSX.Element;
  actionText?: string;
  handleClose: () => void;
}

export enum ToastType {
  success = 'success',
  info = 'info',
  error = 'error',
}

interface BaseNotification
  extends Partial<Omit<GlobalConfigs, 'disableDismissAll'>> {
  id: string;
}
export interface CustomNotification extends BaseNotification {
  content: JSX.Element;
}

export interface ToastNotification extends BaseNotification, IToast {}

export type Notification = CustomNotification | ToastNotification;
export type NewNotification = Omit<
  ToastNotification,
  'id' | 'message' | 'handleClose'
>;

export interface GlobalConfigs {
  disableDecendantStyle: boolean;
  disableDismissAll: boolean;
  timeout: number | 'infinite';
  restartTimeoutAferHover: boolean;
}

export type CustomNotificationProps = Omit<BaseNotification, 'id'>;

export interface ToastrContextProps {
  notifications: Notification[];
  globalConfigs: GlobalConfigs;
  toast: {
    (message: JSX.Element, props?: CustomNotificationProps): void;
    (
      message: string | number | boolean | undefined,
      props?: NewNotification
    ): void;
  };
  clearToast: (id?: string) => void;
}
