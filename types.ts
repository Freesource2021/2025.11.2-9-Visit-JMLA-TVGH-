
export interface ScheduleItem {
  type: 'event';
  id: number;
  date: string;
  day: {
    zh: string;
    ja: string;
  };
  time: '上午' | '下午' | '晚上';
  title: string;
  originalTitle: string;
  description: {
    zh: string;
    ja: string;
  };
  isStarred: boolean;
  isPlaceholder: boolean;
  websiteUrl?: string;
}

export interface TravelSegmentItem {
  type: 'travel';
  id: string;
  duration: {
    zh: string;
    ja: string;
  };
  method: 'subway' | 'walk';
  description: {
    zh: string;
    ja: string;
  };
  mapUrl: string;
  stops?: {
    zh: string;
    ja: string;
  }[];
  landmarks?: {
    zh: string;
    ja: string;
    time: {
      zh: string;
      ja: string;
    };
  }[];
}

export type ItineraryItem = ScheduleItem | TravelSegmentItem;