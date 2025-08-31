import React from 'react';
import type { ScheduleItem } from '../types.ts';
import StarIcon from './icons/StarIcon.tsx';

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

export default ScheduleCard;