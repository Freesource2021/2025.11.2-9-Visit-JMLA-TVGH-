
import React from 'react';

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

export default FilterControls;
