import React from 'react';

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

export default Header;