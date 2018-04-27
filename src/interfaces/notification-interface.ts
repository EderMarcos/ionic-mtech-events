export interface NotificationInterface {
  id: number;
  title: string;
  text: string;
  sound?: string;
  data?: any
  at?: Date;
}
