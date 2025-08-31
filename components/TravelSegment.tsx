
import React from 'react';
import type { TravelSegmentItem } from '../types';
import TrainIcon from './icons/TrainIcon';
import WalkIcon from './icons/WalkIcon';

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
        className="flex items-center gap-3 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md"
        aria-label={`交通資訊: ${item.description.zh} (點擊查看地圖)`}
      >
        <Icon />
        <div className="text-sm text-left">
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
      </a>
    </div>
  );
};

export default TravelSegment;