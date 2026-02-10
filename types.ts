export type ActivityType = 'plane' | 'transport' | 'food' | 'shopping' | 'sightseeing' | 'hotel' | 'info' | 'walk' | 'free';

export interface ScheduleItem {
  time: string;
  activity: string;
  type: ActivityType;
  note?: string;
  location: string;
}

export interface DayOption {
  id: string;
  label: string; // Button text (e.g., "Plan A")
  subLabel?: string; // e.g., "清水寺路線"
  title: string;
  highlights: string[];
  spotGuide: string;
  schedule: ScheduleItem[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string; // Default title
  theme: 'arrival' | 'kyoto' | 'osaka' | 'kobe' | 'departure';
  highlights: string[]; // Default highlights
  spotGuide?: string; // Default guide
  schedule: ScheduleItem[]; // Default schedule
  options?: DayOption[]; // Optional: Alternative plans
}

export interface ChecklistItemData {
  id: number;
  item: string;
  category: 'document' | 'gadget' | 'clothing' | 'money';
  important?: boolean;
}

export interface TaxiCardData {
  label: string;
  jp: string;
  cn: string;
  type: ActivityType;
}

export interface HotelData {
  city: string;
  name: string;
  address: string;
  phone: string;
  note?: string;
}

export interface ShoppingItem {
  day: string;
  area: string;
  items: string[];
}