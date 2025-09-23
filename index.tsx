
import React, { useState, useEffect } from 'react';
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
  notes?: string;
}

interface TravelSegmentItem {
  type: 'travel';
  id: string;
  duration: {
    zh: string;
    ja:string;
  };
  method: 'subway' | 'walk' | 'flight';
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
  notes?: string;
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

// --- NEW FlightIcon Component ---
const FlightIcon: React.FC = () => {
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
      className="h-6 w-6 text-sky-500"
      aria-hidden="true"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
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

// --- NEW SearchIcon Component ---
const SearchIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 text-slate-400" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
      clipRule="evenodd" 
    />
  </svg>
);

// --- NEW PencilIcon Component ---
const PencilIcon: React.FC<{className?: string}> = ({className = "h-4 w-4"}) => (
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
        className={className}
        aria-hidden="true"
    >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
    </svg>
);

// --- NEW TrashIcon Component ---
const TrashIcon: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => (
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
        className={className}
        aria-hidden="true"
    >
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <path d="M10 11v6"/>
        <path d="M14 11v6"/>
    </svg>
);

// --- NEW PlusIcon Component ---
const PlusIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
    </svg>
);


// --- NEW HighlightText Component ---
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/70 text-slate-900 dark:text-slate-900 rounded px-0.5 py-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

// --- FROM components/Header.tsx ---
interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddItem: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onAddItem }) => {
  return (
    <header className="relative text-center border-b-2 border-slate-200 dark:border-slate-700 pb-6">
      <button
        onClick={onAddItem}
        className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-transform active:scale-95 hover:scale-105 shadow-md"
        aria-label="新增行程項目"
      >
        <PlusIcon className="h-4 w-4" />
        <span>新增項目</span>
      </button>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        JMLA 參訪行程 <span className="text-blue-600 dark:text-blue-400">(TVGH專用)</span>
        <span className="block mt-1 text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300">
          JMLA 参観スケジュール (TVGH専用)
        </span>
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        2025年11月2日 - 9日 (*提供英語解說)
        <span className="block mt-1 text-base text-slate-500 dark:text-slate-500">
          2025年11月2日 - 9日 (*英語での解説あり)
        </span>
      </p>
       <div className="mt-6 max-w-lg mx-auto">
          <label htmlFor="search" className="sr-only">搜尋行程</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="搜尋標題、描述或註記..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="搜尋行程內容"
            />
          </div>
        </div>
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
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 my-8">
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


// --- NEW NotesEditor Component ---
interface NotesEditorProps {
    note: string;
    onSave: (newNote: string) => void;
    highlightQuery: string;
}
const NotesEditor: React.FC<NotesEditorProps> = ({ note, onSave, highlightQuery }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [noteText, setNoteText] = useState(note);

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onSave(noteText);
        setIsEditing(false);
    };

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setNoteText(note);
        setIsEditing(true);
    }
    
    const handleTextAreaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
    }
    
    return (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {isEditing ? (
                <div onClick={e => e.stopPropagation()}>
                    <label htmlFor={`note-${Math.random()}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">編輯註記</label>
                    <textarea
                        id={`note-${Math.random()}`}
                        rows={3}
                        className="block w-full text-sm p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 focus:ring-blue-500 focus:border-blue-500"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        onClick={handleTextAreaClick}
                        aria-label="註記內容"
                    ></textarea>
                    <div className="mt-2 text-right">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            儲存
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-grow text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                        {note ? (
                             <HighlightText text={note} highlight={highlightQuery} />
                        ) : (
                            <span className="italic text-slate-400 dark:text-slate-500">沒有註記</span>
                        )}
                    </div>
                    <button
                        onClick={handleEdit}
                        className="flex-shrink-0 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                        aria-label={note ? "編輯註記" : "新增註記"}
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>{note ? '編輯' : '新增註記'}</span>
                    </button>
                </div>
            )}
        </div>
    );
};


// --- FROM components/TravelSegment.tsx ---
interface TravelSegmentProps {
  item: TravelSegmentItem;
  highlightQuery: string;
  onUpdateNote: (id: string, note: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

const methodTextMap = {
  subway: { zh: '地鐵', ja: '地下鉄' },
  walk: { zh: '步行', ja: '徒歩' },
  flight: { zh: '飛機', ja: '飛行機' },
};

const TravelSegment: React.FC<TravelSegmentProps> = ({ item, highlightQuery, onUpdateNote, onDelete, onEdit }) => {
  const Icon = item.method === 'subway' ? TrainIcon : item.method === 'walk' ? WalkIcon : FlightIcon;
  const MethodText = methodTextMap[item.method];

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
        <button 
            onClick={() => onEdit()}
            className="p-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={`編輯交通項目: ${item.description.zh}`}
        >
            <PencilIcon className="h-5 w-5"/>
        </button>
        <button 
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            aria-label={`刪除交通項目: ${item.description.zh}`}
        >
            <TrashIcon />
        </button>
      </div>
      <a
        href={item.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-2xl bg-slate-100 dark:bg-slate-800 p-4 rounded-xl transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md"
        aria-label={`交通資訊: ${item.description.zh} (點擊查看地圖)`}
      >
        <div className="text-slate-500 dark:text-slate-400">
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
                  <p><HighlightText text={item.description.zh} highlight={highlightQuery} /></p>
                  <p><HighlightText text={item.description.ja} highlight={highlightQuery} /></p>
                </div>
              </div>
            </div>

            {item.method === 'flight' && item.stops && item.stops.length > 1 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <ol className="flex items-center justify-between text-xs relative px-2">
                    <li className="relative z-10 flex flex-col items-center text-center w-24">
                      <div className="w-3 h-3 bg-sky-500 rounded-full border-2 border-slate-100 dark:border-slate-800"></div>
                      <div className="mt-1.5">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 block">{item.stops[0].zh}</span>
                        <span className="text-slate-400 dark:text-slate-500">{item.stops[0].ja}</span>
                      </div>
                    </li>

                    <div className="flex-grow h-0.5 bg-slate-300 dark:bg-slate-600 relative">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1">
                            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                        </svg>
                    </div>
                    
                    <li className="relative z-10 flex flex-col items-center text-center w-24">
                       <div className="w-3 h-3 bg-sky-500 rounded-full border-2 border-slate-100 dark:border-slate-800"></div>
                      <div className="mt-1.5">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 block">{item.stops[1].zh}</span>
                        <span className="text-slate-400 dark:text-slate-500">{item.stops[1].ja}</span>
                      </div>
                    </li>
                </ol>
              </div>
            )}

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
        </div>
        <NotesEditor 
            note={item.notes || ''} 
            onSave={(newNote) => onUpdateNote(item.id, newNote)} 
            highlightQuery={highlightQuery} 
        />
      </a>
    </div>
  );
};


// --- FROM components/ScheduleCard.tsx ---
interface ScheduleCardProps {
  item: ScheduleItem;
  onToggleStar: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
  highlightQuery: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onToggleStar, onUpdateNote, onDelete, onEdit, highlightQuery }) => {
  const dateBgColor =
    item.day.zh === '週日' ? 'bg-orange-600' :
    item.day.zh === '週一' ? 'bg-rose-600' :
    item.day.zh === '週二' ? 'bg-teal-600' :
    item.day.zh === '週三' ? 'bg-blue-600' :
    item.day.zh === '週四' ? 'bg-indigo-600' :
    item.day.zh === '週五' ? 'bg-purple-600' : 'bg-gray-600';

  const hasLink = item.websiteUrl && !item.isPlaceholder;

  const cardClasses = `
    relative
    bg-white dark:bg-slate-800 
    rounded-xl shadow-lg transition-shadow duration-300
    overflow-hidden border border-slate-200 dark:border-slate-700
    ${item.isPlaceholder ? 'opacity-70' : 'hover:shadow-2xl'}
  `;

  const CardContent = (
    <>
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-1 rounded-full">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleStar(item.id); }}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label={item.isStarred ? `移除 ${item.title} 的星號` : `為 ${item.title} 加上星號`}
        >
          <StarIcon isStarred={item.isStarred} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="flex-shrink-0 p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={`編輯行程: ${item.title}`}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="flex-shrink-0 p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          aria-label={`刪除行程: ${item.title}`}
        >
          <TrashIcon />
        </button>
      </div>
      <div 
        className={`flex flex-col md:flex-row ${hasLink ? 'cursor-pointer' : ''}`}
        onClick={() => hasLink && window.open(item.websiteUrl, '_blank', 'noopener,noreferrer')}
        role={hasLink ? 'link' : undefined}
        aria-label={hasLink ? `前往 ${item.title} 網站` : undefined}
      >
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
            <div className="pr-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                <HighlightText text={item.title} highlight={highlightQuery} />
                {item.originalTitle && (
                  <span className="ml-2 text-lg font-medium text-slate-500 dark:text-slate-400">
                    (<HighlightText text={item.originalTitle} highlight={highlightQuery} />)
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className={`
            mt-3 text-base leading-relaxed 
            ${item.isPlaceholder ? 'italic text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'}
          `}>
            <p><HighlightText text={item.description.zh} highlight={highlightQuery} /></p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400"><HighlightText text={item.description.ja} highlight={highlightQuery} /></p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        <NotesEditor 
            note={item.notes || ''} 
            onSave={(newNote) => onUpdateNote(item.id, newNote)} 
            highlightQuery={highlightQuery} 
        />
      </div>
    </>
  );

  return <div className={cardClasses}>{CardContent}</div>;
};

// --- NEW ItineraryItemModal Component (replaces AddItemModal) ---
interface ItineraryItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Partial<ItineraryItem>) => void;
    itemToEdit?: ItineraryItem;
}

const ItineraryItemModal: React.FC<ItineraryItemModalProps> = ({ isOpen, onClose, onSave, itemToEdit }) => {
    const [itemType, setItemType] = useState<'event' | 'travel'>('event');
    
    // Event state
    const [eventState, setEventState] = useState<Partial<ScheduleItem>>({ date: '11/2', day: { zh: '週日', ja: '日' }, time: '上午' as '上午' | '下午' | '晚上', title: '', originalTitle: '', description: { zh: '', ja: '' }, websiteUrl: '', isPlaceholder: false, notes: '' });
    
    // Travel state
    const [travelState, setTravelState] = useState<Partial<TravelSegmentItem>>({ duration: { zh: '', ja: '' }, method: 'subway' as 'subway' | 'walk' | 'flight', description: { zh: '', ja: '' }, mapUrl: '', notes: '' });
    const [stops, setStops] = useState<{ zh: string; ja: string }[]>([]);
    const [landmarks, setLandmarks] = useState<{ zh: string; ja: string; time: { zh: string; ja: string } }[]>([]);

    useEffect(() => {
        if (isOpen) {
             if (itemToEdit) {
                setItemType(itemToEdit.type);
                if (itemToEdit.type === 'event') {
                    setEventState({ ...itemToEdit });
                } else { // 'travel'
                    setTravelState({ ...itemToEdit });
                    setStops(itemToEdit.stops || []);
                    setLandmarks(itemToEdit.landmarks || []);
                }
            } else {
                // Reset state on open for adding
                setItemType('event');
                setEventState({ date: '11/2', day: { zh: '週日', ja: '日' }, time: '上午', title: '', originalTitle: '', description: { zh: '', ja: '' }, websiteUrl: '', isPlaceholder: false, notes: '' });
                setTravelState({ duration: { zh: '', ja: '' }, method: 'subway', description: { zh: '', ja: '' }, mapUrl: '', notes: '' });
                setStops([]);
                setLandmarks([]);
            }
        }
    }, [isOpen, itemToEdit]);

    if (!isOpen) return null;

    const handleSave = () => {
        let itemData;
        if (itemType === 'event') {
            itemData = { ...eventState, type: 'event' };
        } else {
            itemData = { ...travelState, type: 'travel', stops: travelState.method !== 'walk' ? stops : undefined, landmarks: travelState.method === 'walk' ? landmarks : undefined };
        }
        onSave(itemData);
        onClose();
    };

    const handleStopChange = (index: number, field: 'zh' | 'ja', value: string) => {
        const newStops = [...stops];
        newStops[index][field] = value;
        setStops(newStops);
    };

    const handleAddStop = () => setStops([...stops, { zh: '', ja: '' }]);
    const handleRemoveStop = (index: number) => setStops(stops.filter((_, i) => i !== index));

    const handleLandmarkChange = (index: number, field: 'zh' | 'ja' | 'time_zh' | 'time_ja', value: string) => {
        const newLandmarks = [...landmarks];
        if (field === 'time_zh') newLandmarks[index].time.zh = value;
        else if (field === 'time_ja') newLandmarks[index].time.ja = value;
        else newLandmarks[index][field] = value;
        setLandmarks(newLandmarks);
    };
    
    const handleAddLandmark = () => setLandmarks([...landmarks, { zh: '', ja: '', time: { zh: '', ja: '' } }]);
    const handleRemoveLandmark = (index: number) => setLandmarks(landmarks.filter((_, i) => i !== index));

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{itemToEdit ? '編輯行程項目' : '新增行程項目'}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">項目類型</label>
                        <select value={itemType} onChange={e => setItemType(e.target.value as any)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-slate-800">
                            <option value="event">參訪活動</option>
                            <option value="travel">交通移動</option>
                        </select>
                    </div>

                    {itemType === 'event' ? (
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium">日期 (格式: 11/2)</label><input type="text" value={eventState.date} onChange={e => setEventState({...eventState, date: e.target.value})} className="mt-1 form-input" /></div>
                                <div><label className="block text-sm font-medium">時間</label><select value={eventState.time} onChange={e => setEventState({...eventState, time: e.target.value as any})} className="mt-1 form-input"><option value="上午">上午</option><option value="下午">下午</option><option value="晚上">晚上</option></select></div>
                                <div><label className="block text-sm font-medium">星期 (中)</label><input type="text" value={eventState.day?.zh} onChange={e => setEventState({...eventState, day: {...(eventState.day || {zh:'', ja:''}), zh: e.target.value}})} className="mt-1 form-input" /></div>
                                <div><label className="block text-sm font-medium">星期 (日)</label><input type="text" value={eventState.day?.ja} onChange={e => setEventState({...eventState, day: {...(eventState.day || {zh:'', ja:''}), ja: e.target.value}})} className="mt-1 form-input" /></div>
                            </div>
                            <div><label className="block text-sm font-medium">標題 (中)</label><input type="text" value={eventState.title} onChange={e => setEventState({...eventState, title: e.target.value})} className="mt-1 form-input" /></div>
                            <div><label className="block text-sm font-medium">標題 (日)</label><input type="text" value={eventState.originalTitle} onChange={e => setEventState({...eventState, originalTitle: e.target.value})} className="mt-1 form-input" /></div>
                            <div><label className="block text-sm font-medium">描述 (中)</label><textarea value={eventState.description?.zh} onChange={e => setEventState({...eventState, description: {...(eventState.description || {zh:'', ja:''}), zh: e.target.value}})} className="mt-1 form-input" rows={2}></textarea></div>
                            <div><label className="block text-sm font-medium">描述 (日)</label><textarea value={eventState.description?.ja} onChange={e => setEventState({...eventState, description: {...(eventState.description || {zh:'', ja:''}), ja: e.target.value}})} className="mt-1 form-input" rows={2}></textarea></div>
                            <div><label className="block text-sm font-medium">網站 URL</label><input type="text" value={eventState.websiteUrl} onChange={e => setEventState({...eventState, websiteUrl: e.target.value})} className="mt-1 form-input" /></div>
                            <div className="flex items-center"><input type="checkbox" checked={eventState.isPlaceholder} onChange={e => setEventState({...eventState, isPlaceholder: e.target.checked})} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><label className="ml-2 block text-sm">此為規劃中項目</label></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div><label className="block text-sm font-medium">交通方式</label><select value={travelState.method} onChange={e => setTravelState({...travelState, method: e.target.value as any})} className="mt-1 form-input"><option value="subway">地鐵</option><option value="walk">步行</option><option value="flight">飛機</option></select></div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium">期間 (中)</label><input type="text" value={travelState.duration?.zh} onChange={e => setTravelState({...travelState, duration: {...(travelState.duration || {zh:'', ja:''}), zh: e.target.value}})} className="mt-1 form-input" /></div>
                                <div><label className="block text-sm font-medium">期間 (日)</label><input type="text" value={travelState.duration?.ja} onChange={e => setTravelState({...travelState, duration: {...(travelState.duration || {zh:'', ja:''}), ja: e.target.value}})} className="mt-1 form-input" /></div>
                            </div>
                            <div><label className="block text-sm font-medium">描述 (中)</label><textarea value={travelState.description?.zh} onChange={e => setTravelState({...travelState, description: {...(travelState.description || {zh:'', ja:''}), zh: e.target.value}})} className="mt-1 form-input" rows={2}></textarea></div>
                            <div><label className="block text-sm font-medium">描述 (日)</label><textarea value={travelState.description?.ja} onChange={e => setTravelState({...travelState, description: {...(travelState.description || {zh:'', ja:''}), ja: e.target.value}})} className="mt-1 form-input" rows={2}></textarea></div>
                            <div><label className="block text-sm font-medium">地圖 URL</label><input type="text" value={travelState.mapUrl} onChange={e => setTravelState({...travelState, mapUrl: e.target.value})} className="mt-1 form-input" /></div>
                            
                            {(travelState.method === 'subway' || travelState.method === 'flight') && (
                                <div>
                                    <h4 className="text-md font-semibold mb-2">站點</h4>
                                    {stops.map((stop, index) => (
                                        <div key={index} className="flex items-center gap-2 mb-2">
                                            <input type="text" placeholder="中文站名" value={stop.zh} onChange={e => handleStopChange(index, 'zh', e.target.value)} className="form-input" />
                                            <input type="text" placeholder="日文站名" value={stop.ja} onChange={e => handleStopChange(index, 'ja', e.target.value)} className="form-input" />
                                            <button onClick={() => handleRemoveStop(index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="h-4 w-4"/></button>
                                        </div>
                                    ))}
                                    <button onClick={handleAddStop} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">新增站點</button>
                                </div>
                            )}

                            {travelState.method === 'walk' && (
                                <div>
                                    <h4 className="text-md font-semibold mb-2">途經景點</h4>
                                    {landmarks.map((landmark, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-2 mb-2 p-2 border rounded-md border-slate-300 dark:border-slate-600">
                                            <input type="text" placeholder="景點 (中)" value={landmark.zh} onChange={e => handleLandmarkChange(index, 'zh', e.target.value)} className="form-input col-span-1" />
                                            <input type="text" placeholder="景點 (日)" value={landmark.ja} onChange={e => handleLandmarkChange(index, 'ja', e.target.value)} className="form-input col-span-1" />
                                            <input type="text" placeholder="時間 (中)" value={landmark.time.zh} onChange={e => handleLandmarkChange(index, 'time_zh', e.target.value)} className="form-input col-span-1" />
                                            <div className="flex items-center gap-2">
                                                <input type="text" placeholder="時間 (日)" value={landmark.time.ja} onChange={e => handleLandmarkChange(index, 'time_ja', e.target.value)} className="form-input w-full" />
                                                <button onClick={() => handleRemoveLandmark(index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon className="h-4 w-4"/></button>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={handleAddLandmark} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">新增景點</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600">取消</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">儲存</button>
                </div>
            </div>
            <style>{`
                .form-input {
                    display: block;
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 0.875rem;
                    border-radius: 0.375rem;
                    border: 1px solid;
                }
                .light .form-input {
                    border-color: #d1d5db; /* slate-300 */
                    background-color: #ffffff;
                }
                .dark .form-input {
                    border-color: #4b5563; /* slate-600 */
                    background-color: #1f2937; /* slate-800 */
                    color: #d1d5db; /* slate-300 */
                }
                .form-input:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    --tw-ring-color: #3b82f6; /* blue-500 */
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px #3b82f6;
                }
            `}</style>
        </div>
    );
};

// --- NEW AddItemSeparator Component ---
const AddItemSeparator: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
    return (
        <div className="relative h-4 flex items-center justify-center group my-4">
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700 transition-all group-hover:bg-slate-300 dark:group-hover:bg-slate-600"></div>
            <button
                onClick={onAdd}
                className="absolute z-10 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400
                           flex items-center justify-center transition-all duration-200
                           opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100
                           hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500
                           ring-4 ring-slate-50 dark:ring-slate-900"
                aria-label="在此處新增行程項目"
            >
                <PlusIcon />
            </button>
        </div>
    );
};


// --- FROM App.tsx ---
const initialItineraryData: ItineraryItem[] = [
  {
    type: 'travel',
    id: 'travel-to-0',
    duration: { zh: '約 2 小時 50 分鐘', ja: '約 2 時間 50 分' },
    method: 'flight',
    description: {
      zh: '從台北松山機場 (TSA) 前往東京羽田機場 (HND)。出發 9:00 AM (台北時間)，抵達 12:50 PM (東京時間)。',
      ja: '台北松山空港 (TSA) から東京羽田空港 (HND) へ。出発 9:00 AM (台北時間)、到着 12:50 PM (東京時間)。',
    },
    mapUrl: 'https://www.google.com/maps/dir/Taipei+Songshan+Airport,+Songshan,+Taipei,+Taiwan/Haneda+Airport,+Hanedakuko,+Ota+City,+Tokyo,+Japan',
    stops: [
        { zh: '台北松山 TSA', ja: '台北松山 TSA' },
        { zh: '東京羽田 HND', ja: '東京羽田 HND' },
    ],
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-hnd-to-hotel',
    duration: { zh: '約 40 分鐘', ja: '約 40 分' },
    method: 'subway',
    description: {
      zh: '從東京羽田機場前往萌木銀座飯店。辦理入境手續後搭乘電車。',
      ja: '東京羽田空港からホテル萌木銀座へ。入国審査後、電車で移動します。',
    },
    mapUrl: 'https://www.google.com/maps/dir/Haneda+Airport,+Hanedakuko,+Ota+City,+Tokyo,+Japan/Hotel+Moegi+Ginza,+3+Chome-3-1+Tsukiji,+Chuo+City,+Tokyo,+Japan/',
    stops: [
        { zh: '羽田機場', ja: '羽田空港' },
        { zh: '築地', ja: '築地' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 0,
    date: '11/2',
    day: { zh: '週日', ja: '日' },
    time: '下午',
    title: '萌木銀座首都酒店',
    originalTitle: '銀座キャピタルホテル 萌木',
    description: {
      zh: '抵達飯店，辦理入住手續並稍作休息。為接下來的參訪行程做準備。地址：中央區築地3-3-1。',
      ja: 'ホテルに到着し、チェックイン手続きを済ませて休憩します。これからの視察スケジュールに備えます。住所：中央区築地3-3-1。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.ginza-capital.jp/moegi.html',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-to-11',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '從萌木銀座飯店步行前往京橋圖書館',
      ja: 'ホテル萌木銀座から京橋図書館まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Hotel+Moegi+Ginza,+3+Chome-3-1+Tsukiji,+Chuo+City,+Tokyo,+Japan/Chuo+City+Kyobashi+Library,+1+Chome-1-1+Shintomi,+Chuo+City,+Tokyo+104-0041,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 11,
    date: '11/2',
    day: { zh: '週日', ja: '日' },
    time: '下午',
    title: '京橋圖書館',
    originalTitle: '京橋図書館',
    description: {
      zh: '參觀位於中央區的京橋圖書館。請注意，週日開放至下午5點 (17:00) 閉館。',
      ja: '中央区にある京橋図書館を見学します。日曜日は17:00に閉館しますのでご注意ください。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.library.city.chuo.tokyo.jp/libguide?11&pid=11',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-11-to-18',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '從京橋圖書館步行前往歌舞伎座',
      ja: '京橋図書館から歌舞伎座まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Chuo+City+Kyobashi+Library,+1+Chome-1-1+Shintomi,+Chuo+City,+Tokyo+104-0041,+Japan/Kabuki-za+Theatre,+4+Chome-12-15+Ginza,+Chuo+City,+Tokyo+104-0061,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 18,
    date: '11/2',
    day: { zh: '週日', ja: '日' },
    time: '晚上',
    title: '歌舞伎座',
    originalTitle: '歌舞伎座',
    description: {
      zh: '觀賞晚場歌舞伎表演。晚場演出時間為 17:00 開始。建議預先購買「一幕見席」票券以觀賞單一幕。',
      ja: '夜の部の歌舞伎を鑑賞します。夜の部の開演時間は17:00です。一幕見席のチケットは事前の購入をお勧めします。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.kabuki-za.co.jp/',
    notes: '「一幕見席」是觀看單一幕的特殊票券，適合想體驗歌舞伎的旅客。需要當天或提前在網上購買，座位有限。',
  },
  {
    type: 'travel',
    id: 'travel-18-to-20',
    duration: { zh: '約 3 分鐘', ja: '約 3 分' },
    method: 'walk',
    description: {
      zh: '從歌舞伎座步行至 Uniqlo Ginza 旗艦店',
      ja: '歌舞伎座からユニクロ銀座店まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Kabuki-za+Theatre,+4+Chome-12-15+Ginza,+Chuo+City,+Tokyo+104-0061,+Japan/UNIQLO+GINZA,+Ginza,+Chuo+City,+Tokyo,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 20,
    date: '11/2',
    day: { zh: '週日', ja: '日' },
    time: '晚上',
    title: 'Uniqlo Ginza 旗艦店',
    originalTitle: 'ユニクロ 銀座店',
    description: {
      zh: '參觀全球旗艦店，共12層樓，提供全系列商品、聯名系列及獨家服務，如UTme!客製化T恤和Uniqlo Coffee。',
      ja: 'グローバル旗艦店を見学。全12フロアで、全商品ラインナップ、コラボレーションシリーズ、UTme!カスタムTシャツやユニクロコーヒーなどの限定サービスを提供しています。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.uniqlo.com/jp/ja/spl/feature/shop/ginza',
    notes: '營業時間至 21:00。外國遊客可享免稅服務。',
  },
  {
    type: 'travel',
    id: 'travel-hotel-change',
    duration: { zh: '約 5 分鐘', ja: '約 5 分' },
    method: 'walk',
    description: {
      zh: '從萌木銀座飯店步行至 Henn na Hotel 銀座',
      ja: 'ホテル萌木銀座から変なホテル銀座まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Hotel+Moegi+Ginza,+3+Chome-3-1+Tsukiji,+Chuo+City,+Tokyo,+Japan/Henn+na+Hotel+Tokyo+Ginza,+2+Chome-2-1+Tsukiji,+Chuo+City,+Tokyo+104-0045,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 15,
    date: '11/3',
    day: { zh: '週一', ja: '月' },
    time: '上午',
    title: 'Henn na Hotel 東京銀座',
    originalTitle: '変なホテル東京 銀座',
    description: {
      zh: '從萌木銀座飯店退房，移動至 Henn na Hotel 銀座辦理入住手續並寄放行李。',
      ja: 'ホテル萌木銀座をチェックアウトし、変なホテル銀座へ移動してチェックイン手続きと荷物預けをします。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.hennnahotel.com/ginza/',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-from-hotel-to-meijijingu',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從 Henn na Hotel 銀座前往明治神宮 (原宿站)',
      ja: '変なホテル銀座から明治神宮（原宿駅）へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Henn+na+Hotel+Tokyo+Ginza,+Tsukiji,+Chuo+City,+Tokyo,+Japan/Meiji+Jingu,+Yoyogikamizonocho,+Shibuya+City,+Tokyo,+Japan/',
    stops: [
        { zh: '築地', ja: '築地' },
        { zh: '日比谷', ja: '日比谷' },
        { zh: '原宿', ja: '原宿' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 12,
    date: '11/3',
    day: { zh: '週一', ja: '月' },
    time: '上午',
    title: '明治神宮',
    originalTitle: '明治神宮',
    description: {
      zh: '參觀明治神宮，適逢「秋之大祭」期間 (11/1-11/3)，可欣賞傳統表演藝術。主要參觀點為隈研吾設計的明治神宮博物館。',
      ja: '明治神宮を訪問します。期間中は「秋の大祭」(11/1-11/3)が開催され、伝統芸能が鑑賞できます。主な見学先は隈研吾氏設計の明治神宮ミュージアムです。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.meijijingu.or.jp/',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-12-to-14',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '從明治神宮步行至澀谷區立中央圖書館',
      ja: '明治神宮から渋谷区立中央図書館まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Meiji+Jingu,+Yoyogikamizonocho,+Shibuya+City,+Tokyo,+Japan/Shibuya+City+Central+Library,+Jingumae,+Shibuya+City,+Tokyo,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 14,
    date: '11/3',
    day: { zh: '週一', ja: '月' },
    time: '下午',
    title: '澀谷區立中央圖書館',
    originalTitle: '渋谷区立中央図書館',
    description: {
      zh: '參觀位於澀谷區的中央圖書館。請注意，開放至下午6點 (18:00) 閉館。',
      ja: '渋谷区にある中央図書館を見学します。18:00に閉館しますのでご注意ください。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.city.shibuya.tokyo.jp/',
    notes: '',
  },
  {
    type: 'event',
    id: 16,
    date: '11/3',
    day: { zh: '週一', ja: '月' },
    time: '下午',
    title: '和田誠紀念文庫',
    originalTitle: '和田誠記念文庫',
    description: {
      zh: '參觀設於澀谷區立中央圖書館內的和田誠紀念文庫，收藏並展示知名插畫家和田誠的資料。',
      ja: '渋谷区立中央図書館内に設置された和田誠記念文庫を見学します。イラストレーター和田誠氏の資料を収蔵・展示しています。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.city.shibuya.tokyo.jp/?page_id=5328',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-from-library-to-harakado',
    duration: { zh: '約 5 分鐘', ja: '約 5 分' },
    method: 'walk',
    description: {
      zh: '從澀谷區立中央圖書館步行至東急 Plaza 原宿「HARAKADO」',
      ja: '渋谷区立中央図書館から東急プラザ原宿「ハラカド」まで徒歩',
    },
    mapUrl: 'https://www.google.com/maps/dir/Shibuya+City+Central+Library,+Jingumae,+Shibuya+City,+Tokyo,+Japan/Tokyu+Plaza+Harajuku+HARAKADO,+Jingumae,+Shibuya+City,+Tokyo,+Japan/',
    notes: '',
  },
  {
    type: 'event',
    id: 13,
    date: '11/3',
    day: { zh: '週一', ja: '月' },
    time: '晚上',
    title: '東急 Plaza 原宿「HARAKADO」',
    originalTitle: '東急プラザ原宿「ハラカド」',
    description: {
      zh: '探索位於原宿的全新文化商業設施，由建築師平田晃久設計。設施內包含獨特的商店、公共錢湯及綠化露台。',
      ja: '建築家・平田晃久氏が設計した原宿の新しい文化商業施設を探索します。施設内にはユニークな店舗、銭湯、緑豊かなテラスなどがあります。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://harakado.tokyu-plaza.com/',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-to-1',
    duration: { zh: '約 25 分鐘', ja: '約 25 分' },
    method: 'subway',
    description: {
      zh: '從 Henn na Hotel 銀座前往虎之門醫院',
      ja: '変なホテル銀座から虎の門病院へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Henn+na+Hotel+Tokyo+Ginza,+Tsukiji,+Chuo+City,+Tokyo,+Japan/Toranomon+Hospital,+Toranomon,+Minato+City,+Tokyo,+Japan/',
    stops: [
        { zh: '築地', ja: '築地' },
        { zh: '神谷町', ja: '神谷町' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 1,
    date: '11/4',
    day: { zh: '週二', ja: '火' },
    time: '上午',
    title: '虎之門醫院 中央圖書室',
    originalTitle: '虎の門病院 中央図書室',
    description: {
      zh: '參觀位於虎之門醫院內的中央圖書室。該醫院隸屬於國家公務員共濟組合聯合會，其圖書室是專為醫療專業人員服務的專業圖書館。',
      ja: '虎の門病院内にある中央図書室を見学します。この病院は国家公務員共済組合連合会に所属しており、その図書室は医療専門家向けの専門図書館です。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://toranomon.kkr.or.jp/cms/about/facilities/patients_library/',
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-to-2',
    duration: { zh: '約 25 分鐘', ja: '約 25 分' },
    method: 'subway',
    description: {
      zh: '從虎之門醫院前往聖路加國際大學',
      ja: '虎の門病院から聖路加国際大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Toranomon+Hospital,+Toranomon,+Minato+City,+Tokyo,+Japan/St.+Luke\'s+International+University,+Akashicho,+Chuo+City,+Tokyo,+Japan/',
    stops: [
        { zh: '神谷町', ja: '神谷町' },
        { zh: '築地', ja: '築地' },
    ],
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-5-to-19',
    duration: { zh: '約 20 分鐘', ja: '約 20 分' },
    method: 'subway',
    description: {
      zh: '從東京大學前往神保町書店街',
      ja: '東京大学から神保町古書店街へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/The+University+of+Tokyo,+Hongo,+Bunkyo+City,+Tokyo,+Japan/Jimbocho+Station,+Chiyoda+City,+Tokyo,+Japan/',
    stops: [
      { zh: '春日', ja: '春日' },
      { zh: '神保町', ja: '神保町' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 19,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '晚上',
    title: '神保町書店街',
    originalTitle: '神保町古書店街',
    description: {
      zh: '探索世界知名的神保町古書店街，這裡匯集了數百家新舊書店、出版社和文學咖啡館。',
      ja: '世界的に有名な神保町古書店街を散策します。ここには何百もの新旧書店、出版社、文学カフェが集まっています。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://jimbou.info/',
    notes: '此區有特色的「Book Hotel 神保町」，是專為愛書人設計的住宿空間。',
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
    notes: '',
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
      zh: '國際兒童文學館，國立國会圖書館的主體建築是1906年建立的帝國圖書館（現稱「磚瓦建築」），已被登記為東京都的歷史建築。',
      ja: '国際子ども図書館、国立国会図書館の主体建築は1906年に設立された帝国図書館（現「レンガ棟」）であり、東京都の歴史的建造物として登録されています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.kodomo.go.jp/',
    notes: '',
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
    notes: '',
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
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-7-to-22',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從東京慈惠會醫科大學前往JMLA總部',
      ja: '東京慈恵会医科大学からJMLA本部へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/The+Jikei+University+School+of+Medicine,+Nishishinbashi,+Minato+City,+Tokyo,+Japan/Japan+Medical+Library+Association,+2-ch%C5%8Dme-2-15+Sotokanda,+Chiyoda+City,+Tokyo+101-0021,+Japan/',
    stops: [
        { zh: '御成門', ja: '御成門' },
        { zh: '大手町', ja: '大手町' },
        { zh: '淡路町', ja: '淡路町' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 22,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '下午',
    title: '拜會JMLA總部(僅TMLA理監事)',
    originalTitle: 'JMLA本部表敬訪問 (TMLA役員限定)',
    description: {
      zh: '拜會日本醫學圖書館協會 (JMLA) 總部，此為TMLA理監事限定行程，將與協會成員進行交流，並了解其運作模式與最新計畫。',
      ja: '日本医学図書館協会（JMLA）本部を表敬訪問します。この訪問はTMLAの役員に限定されており、協会のメンバーと交流し、その運営モデルと最新のプロジェクトについて学びます。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.jmla.or.jp/',
    notes: '',
  },
  {
    type: 'event',
    id: 21,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '晚上',
    title: 'JMLA晚宴',
    originalTitle: 'JMLA懇親会',
    description: {
      zh: '由JMLA主辦的晚宴，僅限理監事參加。',
      ja: 'JMLA主催の懇親会。理事・監事のみ参加。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: '',
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
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
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-to-17',
    duration: { zh: '約 25 分鐘', ja: '約 25 分' },
    method: 'subway',
    description: {
      zh: '從 Henn na Hotel 銀座前往東京都立中央圖書館',
      ja: '変なホテル銀座から東京都立中央図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Henn+na+Hotel+Tokyo+Ginza/Tokyo+Metropolitan+Central+Library,+5-7-13+Minami-Azabu,+Minato-ku,+Tokyo/',
    stops: [
      { zh: '築地', ja: '築地' },
      { zh: '六本木', ja: '六本木' },
      { zh: '広尾', ja: '広尾' },
    ],
    notes: '',
  },
  {
    type: 'event',
    id: 17,
    date: '11/8',
    day: { zh: '週六', ja: '土' },
    time: '上午',
    title: '東京都立中央圖書館',
    originalTitle: '東京都立中央図書館',
    description: {
      zh: '參觀位於港區有栖川宮紀念公園內的東京都立中央圖書館，是東京都會區的中央參考圖書館。',
      ja: '港区の有栖川宮記念公園内にある東京都立中央図書館を見学します。東京都の中心的役割を担う図書館です。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.library.metro.tokyo.lg.jp/',
    notes: '',
  },
  {
    type: 'event',
    id: 10,
    date: '11/9',
    day: { zh: '週日', ja: '日' },
    time: '下午',
    title: '賦歸',
    originalTitle: '帰国',
    description: {
      zh: '行程結束，準備前往東京羽田機場搭機返回台北。',
      ja: 'スケジュール終了後、東京羽田空港へ移動し、台北へ帰国します。',
    },
    isStarred: false,
    isPlaceholder: true,
    notes: '',
  },
  {
    type: 'travel',
    id: 'travel-to-10',
    duration: { zh: '約 4 小時', ja: '約 4 時間' },
    method: 'flight',
    description: {
      zh: '從東京羽田機場 (HND) 前往台北松山機場 (TSA)。出發 14:15 PM (東京時間)，抵達 17:15 PM (台北時間)。',
      ja: '東京羽田空港 (HND) から台北松山空港 (TSA) へ。出発 14:15 PM (東京時間)、到着 17:15 PM (台北時間)。',
    },
    mapUrl: 'https://www.google.com/maps/dir/Haneda+Airport,+Hanedakuko,+Ota+City,+Tokyo,+Japan/Taipei+Songshan+Airport,+Songshan,+Taipei,+Taiwan',
    stops: [
        { zh: '東京羽田 HND', ja: '東京羽田 HND' },
        { zh: '台北松山 TSA', ja: '台北松山 TSA' },
    ],
    notes: '',
  },
];

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<ItineraryItem[]>(() => {
    try {
      const savedData = localStorage.getItem('itineraryData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Could not load itinerary data from localStorage", error);
    }
    return initialItineraryData;
  });
  
  const [selectedDate, setSelectedDate] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    item?: ItineraryItem;
    index?: number;
  }>({ isOpen: false, mode: 'add' });

  useEffect(() => {
    try {
      localStorage.setItem('itineraryData', JSON.stringify(itineraryData));
    } catch (error) {
      console.error("Could not save itinerary data to localStorage", error);
    }
  }, [itineraryData]);

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
  
  const handleUpdateNote = (id: number | string, newNote: string) => {
    setItineraryData(prevData =>
        prevData.map(item => {
            if (item.id === id) {
                return { ...item, notes: newNote };
            }
            return item;
        })
    );
  };

  const handleOpenAddModal = (insertAtIndex: number) => {
      setModalState({ isOpen: true, mode: 'add', index: insertAtIndex });
  };

  const handleOpenEditModal = (itemToEdit: ItineraryItem) => {
      const index = itineraryData.findIndex(i => i.id === itemToEdit.id);
      if (index > -1) {
          setModalState({ isOpen: true, mode: 'edit', item: itemToEdit, index });
      }
  };
  
  const handleAddItemToEnd = () => {
      handleOpenAddModal(itineraryData.length);
  };

  const handleCloseModal = () => {
      setModalState({ isOpen: false, mode: 'add', item: undefined, index: undefined });
  };

  const handleSaveItem = (itemData: Partial<ItineraryItem>) => {
      if (modalState.mode === 'edit' && modalState.index !== undefined && modalState.item) {
          const updatedData = [...itineraryData];
          let fullItem = itemData as ItineraryItem;
          // Preserve isStarred as it's not in the edit form
          if (fullItem.type === 'event' && modalState.item.type === 'event') {
              fullItem.isStarred = modalState.item.isStarred;
          }
          updatedData[modalState.index] = fullItem;
          setItineraryData(updatedData);
      } else if (modalState.mode === 'add' && modalState.index !== undefined) {
          let newItem: ItineraryItem;
          if (itemData.type === 'event') {
              const newId = Math.max(0, ...itineraryData.filter((i): i is ScheduleItem => i.type === 'event').map(i => i.id)) + 1;
              newItem = { ...(itemData as Omit<ScheduleItem, 'id'>), id: newId, isStarred: false };
          } else {
              const newId = `travel-new-${Date.now()}`;
              newItem = { ...(itemData as Omit<TravelSegmentItem, 'id'>), id: newId };
          }
          const updatedData = [...itineraryData];
          updatedData.splice(modalState.index, 0, newItem);
          setItineraryData(updatedData);
      }
  };

  const handleDeleteItem = (id: number | string) => {
    const itemToDelete = itineraryData.find(i => i.id === id);
    const title = itemToDelete?.type === 'event' ? itemToDelete.title : '此交通項目';
    if(window.confirm(`您確定要刪除「${title}」嗎？`)){
      setItineraryData(prevData => prevData.filter(item => item.id !== id));
    }
  };

  const uniqueDates = [...new Set(
    itineraryData
      .filter((item): item is Extract<ItineraryItem, { type: 'event' }> => item.type === 'event')
      .map(item => item.date)
  )]
  // Fix: Explicitly type `a` and `b` as strings to resolve TypeScript inference issue where they were being treated as `unknown`.
  .sort((a: string, b: string) => {
    const [monthA, dayA] = a.split('/').map(Number);
    const [monthB, dayB] = b.split('/').map(Number);
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    return dayA - dayB;
  });

  const finalItinerary = (() => {
    // 1. Filter by date
    const dateFiltered = selectedDate === 'all'
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
            const prevItem = allItems[index - 1];
            if (prevItem && prevItem.type ==='event' && prevItem.date === selectedDate) {
                 return true;
            }
            if (index === allItems.length - 1) {
                const lastEvent = allItems[index-1];
                if(lastEvent && lastEvent.type === 'event' && lastEvent.date === selectedDate) {
                    return true;
                }
            }
          }
          return false;
        });

    // 2. Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return dateFiltered;
    }

    const matchingIndices = new Set<number>();
    dateFiltered.forEach((item, index) => {
      let isMatch = false;
      if (item.type === 'event') {
        isMatch =
          item.title.toLowerCase().includes(query) ||
          item.originalTitle.toLowerCase().includes(query) ||
          item.description.zh.toLowerCase().includes(query) ||
          item.description.ja.toLowerCase().includes(query) ||
          (item.notes || '').toLowerCase().includes(query);
      } else if (item.type === 'travel') {
        isMatch =
          item.description.zh.toLowerCase().includes(query) ||
          item.description.ja.toLowerCase().includes(query) ||
          (item.notes || '').toLowerCase().includes(query);
      }

      if (isMatch) {
        matchingIndices.add(index);
        if (item.type === 'event' && index > 0) {
          const prevItem = dateFiltered[index - 1];
          if (prevItem.type === 'travel') {
            matchingIndices.add(index - 1);
          }
        }
        if(item.type === 'travel' && index < dateFiltered.length -1) {
             const nextItem = dateFiltered[index+1];
             if(nextItem.type === 'event') {
                 matchingIndices.add(index+1);
             }
        }
      }
    });

    return dateFiltered.filter((_, index) => matchingIndices.has(index));
  })();


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddItem={handleAddItemToEnd}
        />
        <div>
          <div className="text-center">
            <a
              href="https://tabelog.com/tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-slate-900 transition-all duration-200 hover:shadow-lg active:scale-95"
              aria-label="前往 Tabelog 餐廳網站"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                <path d="M7 2v20"/>
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
              </svg>
              <span>Tabelog餐廳</span>
            </a>
          </div>
          <FilterControls
            dates={uniqueDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        <div className="mt-2">
            <AddItemSeparator onAdd={() => handleOpenAddModal(0)} />
            {finalItinerary.map((item, index) => {
                const originalIndex = itineraryData.findIndex(i => i.id === item.id);
                return (
                    <div key={item.id}>
                        <div className="my-8">
                            {item.type === 'travel' ? (
                                <TravelSegment item={item} highlightQuery={searchQuery} onUpdateNote={handleUpdateNote} onDelete={() => handleDeleteItem(item.id)} onEdit={() => handleOpenEditModal(item)} />
                            ) : (
                                <ScheduleCard item={item} onToggleStar={handleToggleStar} onUpdateNote={handleUpdateNote} onDelete={() => handleDeleteItem(item.id)} onEdit={() => handleOpenEditModal(item)} highlightQuery={searchQuery} />
                            )}
                        </div>
                        <AddItemSeparator onAdd={() => handleOpenAddModal(originalIndex + 1)} />
                    </div>
                );
            })}
        </div>
        <ItineraryItemModal 
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            onSave={handleSaveItem}
            itemToEdit={modalState.item}
        />
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