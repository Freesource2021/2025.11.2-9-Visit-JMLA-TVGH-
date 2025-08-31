
import React from 'react';
import type { TravelSegmentItem } from '../types.ts';
import TrainIcon from './icons/TrainIcon.tsx';
import WalkIcon from './icons/WalkIcon.tsx';
import LandmarkIcon from './icons/LandmarkIcon.tsx';

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

        {/* Subway stops section */}
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

        {/* Walking landmarks section */}
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

export default TravelSegment;