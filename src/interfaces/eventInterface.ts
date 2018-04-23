export interface EventInterface {
  date: Date;
  endTime: Date;
  eventName: string;
  exhibitorName: string;
  exhibitorImg: string;
  eventImg: string;
  breakFast: boolean;
  day: string;
  description: string;
  latitude: number;
  longitude: number;
  place: string;
  address: string;
  id?: string;
}
