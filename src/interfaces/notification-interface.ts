export interface NotificationInterface {
  id: number;
  title: string;
  text: string;
  sound?: string;
  data?: any
  at?: Date;
  icon?: string,
  smallIcon?: string,
  launch?: boolean,
  vibrate?: boolean;
}
