
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// --- FROM types.ts ---
interface ScheduleItem {
  type: 'event';
  id: number;
  date: string;
  day: {
    zh: string;
    ja: string;
  };
  time: '上午' | '下午';
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

interface TravelSegmentItem {
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

type ItineraryItem = ScheduleItem | TravelSegmentItem;


// --- FROM components/icons/StarIcon.tsx ---
interface StarIconProps {
  isStarred: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ isStarred }) => {
  if (isStarred) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-slate-400 dark:text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};


// --- FROM components/icons/TrainIcon.tsx ---
const TrainIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="h-6 w-6 text-blue-500"
      aria-hidden="true"
    >
      <path d="M10 4h4" />
      <path d="M10 20h4" />
      <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
      <path d="M6 12h12" />
      <path d="M10 16h4" />
      <path d="m14 4-2-2-2 2" />
      <path d="m14 20-2 2-2-2" />
    </svg>
  );
};


// --- FROM components/icons/WalkIcon.tsx ---
const WalkIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="h-6 w-6 text-emerald-500"
      aria-hidden="true"
    >
      <path d="M12 22c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4Z" />
      <path d="M20 13.7" />
      <path d="M4 14.5" />
      <path d="M15.5 8.5C15.5 5.5 13 3 10 3s-5.5 2.5-5.5 5.5" />
      <path d="M16.4 14.7L12 11l-4.4 3.7" />
    </svg>
  );
};


// --- FROM components/icons/LandmarkIcon.tsx ---
const LandmarkIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="h-4 w-4 text-emerald-500"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
};


// --- FROM components/Header.tsx ---
const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-slate-200 dark:border-slate-700 pb-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        JMLA 參訪行程 <span className="text-blue-600 dark:text-blue-400">(草案)</span>
        <span className="block mt-1 text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300">
          JMLA 参観スケジュール (案)
        </span>
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        2025年11月4日 - 7日 (*提供英語解說)
        <span className="block mt-1 text-base text-slate-500 dark:text-slate-500">
          2025年11月4日 - 7日 (*英語での解説あり)
        </span>
      </p>
    </header>
  );
};


// --- FROM components/FilterControls.tsx ---
interface FilterControlsProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ dates, selectedDate, onSelectDate }) => {
  const allDates = ['all', ...dates];

  const getButtonText = (date: string) => {
    if (date === 'all') return '全部顯示';
    const [month, day] = date.split('/');
    return `${month}月${day}日`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
      {allDates.map((date) => {
        const isActive = selectedDate === date;
        const buttonClasses = `
          px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          dark:focus:ring-offset-slate-900
          ${isActive 
            ? 'bg-blue-600 text-white shadow' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }
        `;
        return (
          <button
            key={date}
            onClick={() => onSelectDate(date)}
            className={buttonClasses}
            aria-pressed={isActive}
          >
            {getButtonText(date)}
          </button>
        );
      })}
    </div>
  );
};


// --- FROM components/TravelSegment.tsx ---
interface TravelSegmentProps {
  item: TravelSegmentItem;
}

const methodTextMap = {
  subway: { zh: '地鐵', ja: '地下鉄' },
  walk: { zh: '步行', ja: '徒歩' },
};

const TravelSegment: React.FC<TravelSegmentProps> = ({ item }) => {
  const Icon = item.method === 'subway' ? TrainIcon : WalkIcon;
  const MethodText = methodTextMap[item.method];

  return (
    <div className="flex items-center justify-center">
      <a
        href={item.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-2xl text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md"
        aria-label={`交通資訊: ${item.description.zh} (點擊查看地圖)`}
      >
        <div className="flex items-center gap-4">
          <Icon />
          <div className="text-sm text-left flex-grow">
            <p className="font-bold">
              {MethodText.zh} - {item.duration.zh}
              <span className="ml-2 font-normal text-slate-400 dark:text-slate-500">
                ({MethodText.ja} - {item.duration.ja})
              </span>
            </p>
            <div className="text-xs text-slate-400 dark:text-slate-500">
              <p>{item.description.zh}</p>
              <p>{item.description.ja}</p>
            </div>
          </div>
        </div>

        {item.method === 'subway' && item.stops && item.stops.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <ol className="flex items-start justify-between text-xs relative px-2">
              <div 
                className="absolute top-1.5 left-0 w-full h-0.5 bg-slate-300 dark:bg-slate-600 -translate-y-1/2" 
                style={{
                  left: `calc(100% / ${item.stops.length} / 2)`, 
                  width: `calc(100% - (100% / ${item.stops.length}))`
                }}>
              </div>
              
              {item.stops.map((stop) => (
                <li key={stop.ja} className="relative z-10 flex flex-col items-center text-center w-20">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-100 dark:border-slate-800"></div>
                  <div className="mt-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 block">{stop.zh}</span>
                    <span className="text-slate-400 dark:text-slate-500">{stop.ja}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {item.method === 'walk' && item.landmarks && item.landmarks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
              <LandmarkIcon />
              <span>途經景點 (経由する名所)</span>
            </div>
            <ul className="flex flex-col gap-y-2 text-sm px-2">
              {item.landmarks.map((landmark) => (
                <li key={landmark.ja} className="flex items-baseline justify-between text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50 pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <span>{landmark.zh}</span>
                    <span className="ml-1.5 text-xs opacity-80">({landmark.ja})</span>
                  </div>
                  <span className="font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {landmark.time.zh}
                    <span className="ml-1 text-xs opacity-80">({landmark.time.ja})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </a>
    </div>
  );
};


// --- FROM components/ScheduleCard.tsx ---
interface ScheduleCardProps {
  item: ScheduleItem;
  onToggleStar: (id: number) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onToggleStar }) => {
  const dateBgColor =
    item.day.zh === '週二' ? 'bg-teal-600' :
    item.day.zh === '週三' ? 'bg-blue-600' :
    item.day.zh === '週四' ? 'bg-indigo-600' :
    item.day.zh === '週五' ? 'bg-purple-600' : 'bg-gray-600';

  const hasLink = item.websiteUrl && !item.isPlaceholder;

  const cardClasses = `
    flex flex-col md:flex-row bg-white dark:bg-slate-800 
    rounded-xl shadow-lg transition-shadow duration-300
    overflow-hidden border border-slate-200 dark:border-slate-700
    ${item.isPlaceholder ? 'opacity-70' : 'hover:shadow-2xl'}
    ${hasLink ? 'cursor-pointer' : ''}
  `;

  const CardContent = (
    <>
      <div className={`
        flex-shrink-0 p-4 md:p-6 md:w-40 text-white 
        flex items-center justify-between md:flex-col md:justify-center 
        ${dateBgColor}
      `}>
        <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">{item.date}</p>
            <p className="text-lg md:text-xl font-medium">
                {item.day.zh}
                <span className="text-base opacity-80 ml-1">({item.day.ja})</span>
            </p>
        </div>
        <div className="md:mt-4 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
          {item.time}
        </div>
      </div>
      <div className="p-6 md:p-8 flex-grow">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {item.title}
              {item.originalTitle && (
                <span className="ml-2 text-lg font-medium text-slate-500 dark:text-slate-400">
                  ({item.originalTitle})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={(e) => {
              if (hasLink) {
                e.preventDefault();
              }
              e.stopPropagation();
              onToggleStar(item.id);
            }}
            className="flex-shrink-0 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={item.isStarred ? `移除 ${item.title} 的星號` : `為 ${item.title} 加上星號`}
          >
            <StarIcon isStarred={item.isStarred} />
          </button>
        </div>

        <div className={`
          mt-3 text-base leading-relaxed 
          ${item.isPlaceholder ? 'italic text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'}
        `}>
          <p>{item.description.zh}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description.ja}</p>
        </div>
      </div>
    </>
  );

  if (hasLink) {
    return (
      <a 
        href={item.websiteUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={cardClasses}
        aria-label={`前往 ${item.title} 網站`}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  );
};


// --- FROM App.tsx ---
const initialItineraryData: ItineraryItem[] = [
  {
    type: 'event',
    id: 1,
    date: '11/4',
    day: { zh: '週二', ja: '火' },
    time: '上午',
    title: '醫院或醫學圖書館',
    originalTitle: '',
    description: {
      zh: '仍在規劃中。',
      ja: '現在計画中です。',
    },
    isStarred: false,
    isPlaceholder: true,
  },
  {
    type: 'travel',
    id: 'travel-to-2',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '從銀座地區前往聖路加國際大學',
      ja: '銀座エリアから聖路加国際大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Ginza,+Chuo+City,+Tokyo,+Japan/St.+Luke\'s+International+University,+Akashicho,+Chuo+City,+Tokyo,+Japan',
    landmarks: [
        { zh: '歌舞伎座', ja: '歌舞伎座', time: { zh: '約 4 分', ja: '約 4 分' } },
        { zh: '築地本願寺', ja: '築地本願寺', time: { zh: '約 6 分', ja: '約 6 分' } },
    ],
  },
  {
    type: 'event',
    id: 2,
    date: '11/4',
    day: { zh: '週二', ja: '火' },
    time: '下午',
    title: '聖路加國際大學圖書館',
    originalTitle: '聖路加国際大学',
    description: {
      zh: '位於東京都中央區，是以護理和醫學教育聞名的私立大學，也是日本最具代表性的護理學校之一。',
      ja: '東京都中央区に位置し、看護学と医学教育で知られる私立大学であり、日本を代表する看護学校の一つです。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.slcn.ac.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-3',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往東京大學（本鄉校區）',
      ja: '銀座築地駅から東京大学（本郷キャンパス）へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/The+University+of+Tokyo,+Hongo,+Bunkyo+City,+Tokyo,+Japan',
    stops: [
        { zh: '築地', ja: '築地' },
        { zh: '銀座', ja: '銀座' },
        { zh: '霞關', ja: '霞ケ関' },
        { zh: '本鄉三丁目', ja: '本郷三丁目' },
    ],
  },
  {
    type: 'event',
    id: 3,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '上午',
    title: '東京大學醫學圖書館',
    originalTitle: '東京大学医学図書館',
    description: {
      zh: '東京大學醫學圖書館是隸屬於日本頂尖學術機構東京大學醫學院的重要圖書館。它為醫學、生命科學研究和臨床需求提供了豐富的資源和空間。',
      ja: '東京大学医学図書館は、日本のトップクラスの学術機関である東京大学医学部に所属する重要な図書館です。医学、生命科学の研究、臨床ニーズに応える豊富なリソースとスペースを提供しています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.m.u-tokyo.ac.jp/',
  },
  {
    type: 'event',
    id: 4,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '上午',
    title: '健康與醫學博物館',
    originalTitle: '健康と医学の博物館',
    description: {
      zh: '位於東京都文京區，鄰近東京大學醫學院及其附屬醫院，是一座專注於醫學史、健康教育及現代醫學發展的專業博物館。與醫學圖書館位於同校區，步行即可抵達。',
      ja: '東京都文京区に位置し、東京大学医学部とその附属病院に隣接しています。医学史、健康教育、現代医学の発展に焦点を当てた専門博物館です。医学図書館と同じキャンパス内にあり、徒歩でアクセス可能です。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://mhm.m.u-tokyo.ac.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-5',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '於東京大學本鄉校區內步行前往總合圖書館',
      ja: '東京大学本郷キャンパス内を歩いて総合図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/University+of+Tokyo+Medical+Library/The+University+of+Tokyo+General+Library,+Hongo,+Bunkyo+City,+Tokyo,+Japan',
    landmarks: [
        { zh: '赤門', ja: '赤門', time: { zh: '約 3 分', ja: '約 3 分' } },
        { zh: '安田講堂', ja: '安田講堂', time: { zh: '約 4 分', ja: '約 4 分' } },
        { zh: '三四郎池', ja: '三四郎池', time: { zh: '約 3 分', ja: '約 3 分' } },
    ],
  },
  {
    type: 'event',
    id: 5,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '下午',
    title: '東京大學總合圖書館',
    originalTitle: '東京大学総合図書館',
    description: {
      zh: '東京大學總合圖書館主要由本館和新建的地下書庫（Library Plaza）組成，擁有一個深達46米的自動化地下書庫，可容納約300萬冊圖書。',
      ja: '東京大学総合図書館は、主に本館と新設された地下書庫（ライブラリープラザ）から構成されており、深さ46メートルの自動化された地下書庫には約300万冊の図書を収容できます。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.u-tokyo.ac.jp/ja/library/general',
  },
  {
    type: 'travel',
    id: 'travel-to-6',
    duration: { zh: '約 25 分鐘', ja: '約 25 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往國際兒童文學館',
      ja: '銀座築地駅から国際子ども図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/International+Library+of+Children\'s+Literature,+Uenokoen,+Taito+City,+Tokyo,+Japan',
    stops: [
        { zh: '築地', ja: '築地' },
        { zh: '秋葉原', ja: '秋葉原' },
        { zh: '上野', ja: '上野' },
    ],
  },
  {
    type: 'event',
    id: 6,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '上午',
    title: '國際兒童文學館，國立國會圖書館',
    originalTitle: '国際子ども図書館、国立国会図書館',
    description: {
      zh: '國際兒童文學館，國立國會圖書館的主體建築是1906年建立的帝國圖書館（現稱「磚瓦建築」），已被登記為東京都的歷史建築。',
      ja: '国際子ども図書館、国立国会図書館の主体建築は1906年に設立された帝国図書館（現「レンガ棟」）であり、東京都の歴史的建造物として登録されています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.kodomo.go.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-7',
    duration: { zh: '約 35 分鐘', ja: '約 35 分' },
    method: 'subway',
    description: {
      zh: '從國際兒童文學館前往東京慈惠會醫科大學',
      ja: '国際子ども図書館から東京慈恵会医科大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/International+Library+of+Children\'s+Literature,+Uenokoen,+Taito+City,+Tokyo,+Japan/The+Jikei+University+School+of+Medicine,+Nishishinbashi,+Minato+City,+Tokyo,+Japan',
    stops: [
        { zh: '上野', ja: '上野' },
        { zh: '銀座', ja: '銀座' },
        { zh: '神谷町', ja: '神谷町' },
    ],
  },
  {
    type: 'event',
    id: 7,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '下午',
    title: '東京慈惠會醫科大學 圖書館暨檔案館',
    originalTitle: '東京慈恵会医科大学 図書館・学術情報館',
    description: {
      zh: '東京慈惠會醫科大學的附屬圖書館暨學術檔案中心。',
      ja: '東京慈恵会医科大学の附属図書館および学術アーカイブセンターです。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.jikei.ac.jp/center/amc/',
  },
  {
    type: 'travel',
    id: 'travel-to-8',
    duration: { zh: '約 20 分鐘', ja: '約 20 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往國立國會圖書館',
      ja: '銀座築地駅から国立国会図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/National+Diet+Library,+Nagatacho,+Chiyoda+City,+Tokyo,+Japan',
    stops: [
        { zh: '築地', ja: '築地' },
        { zh: '霞關', ja: '霞ケ関' },
        { zh: '國會議事堂前', ja: '国会議事堂前' },
    ],
  },
  {
    type: 'event',
    id: 8,
    date: '11/7',
    day: { zh: '週五', ja: '金' },
    time: '上午',
    title: '國立國會圖書館',
    originalTitle: '国立国会図書館',
    description: {
      zh: '國立國會圖書館（NDL）是日本唯一的國家圖書館。它成立於1948年，為國會議員、行政和司法機構，以及全體日本民眾和全球研究人員提供廣泛的館藏和資訊服務。',
      ja: '国立国会図書館（NDL）は日本唯一の国立図書館です。1948年に設立され、国会議員、行政・司法機関、そして日本の全国民および世界の研究者に幅広い蔵書と情報サービスを提供しています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.ndl.go.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-9',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從國會圖書館(永田町站)前往早稻田大學',
      ja: '国会図書館(永田町駅)から早稲田大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/National+Diet+Library,+Nagatacho,+Chiyoda+City,+Tokyo,+Japan/The+Waseda+International+House+of+Literature+(The+Haruki+Murakami+Library),+Nishiwaseda,+Shinjuku+City,+Tokyo,+Japan',
    stops: [
        { zh: '永田町', ja: '永田町' },
        { zh: '飯田橋', ja: '飯田橋' },
        { zh: '早稻田', ja: '早稲田' },
    ],
  },
  {
    type: 'event',
    id: 9,
    date: '11/7',
    day: { zh: '週五', ja: '金' },
    time: '下午',
    title: '早稻田大學國際文學館（村上春樹圖書館）',
    originalTitle: '早稲田大学国際文学館（村上春樹ライブラリー）',
    description: {
      zh: '也被稱為「村上春樹圖書館」，是一個集學術圖書館、文學博物館和文化交流空間於一體的現代化設施。它位於東京都新宿區的早稻田大學主校區，由建築師隈研吾設計。',
      ja: '「村上春樹ライブラリー」としても知られ、学術図書館、文学博物館、文化交流スペースを一体化した近代的な施設です。東京都新宿区の早稲田大学メインキャンパスに位置し、建築家の隈研吾によって設計されました。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.waseda.jp/culture/wihl/',
  },
];

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState(initialItineraryData);
  const [selectedDate, setSelectedDate] = useState('all');

  const handleToggleStar = (id: number) => {
    setItineraryData(prevData =>
      prevData.map(item => {
        if (item.type === 'event' && item.id === id) {
          return { ...item, isStarred: !item.isStarred };
        }
        return item;
      })
    );
  };
  
  const uniqueDates = [...new Set(
    initialItineraryData
      .filter((item): item is Extract<ItineraryItem, { type: 'event' }> => item.type === 'event')
      .map(item => item.date)
  )];

  const filteredItinerary = selectedDate === 'all'
    ? itineraryData
    : itineraryData.filter((item, index, allItems) => {
        if (item.type === 'event') {
          return item.date === selectedDate;
        }
        if (item.type === 'travel') {
          const nextItem = allItems[index + 1];
          if (nextItem && nextItem.type === 'event') {
            return nextItem.date === selectedDate;
          }
        }
        return false;
      });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Header />
        <div className="mt-8">
          <FilterControls
            dates={uniqueDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        <div className="mt-10 space-y-8">
          {filteredItinerary.map((item) => {
            if (item.type === 'travel') {
              return <TravelSegment key={item.id} item={item} />;
            }
            return <ScheduleCard key={item.id} item={item} onToggleStar={handleToggleStar} />;
          })}
        </div>
      </main>
    </div>
  );
};


// --- FROM original index.tsx ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);