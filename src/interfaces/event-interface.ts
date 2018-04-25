export interface EventInterface {
  date?: number;
  endTime?: number;
  eventName: string;
  exhibitorName?: string;
  exhibitorImg?: string;
  eventImg?: string;
  breakFast: boolean;
  day: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  place?: string;
  address?: string;
  id?: string;
  available: boolean;
}
