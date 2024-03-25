import { useContext } from 'react';
import { Dayjs } from 'dayjs';
import { LocaleContext } from './LocaleContext';
import allLocales from './locale';
import './index.css';
interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

export default function Header(props: HeaderProps) {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props;
  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];

  return (
    <div className="header">
      <div className="flex items-center h-[28px] leading-7">
        <div className="header-icon" onClick={prevMonthHandler}>&lt;</div>
        <div className="text-base">{curMonth.format(CalendarContext.formatMonth)}</div>
        <div className="header-icon" onClick={nextMonthHandler}>&gt;</div>
        <button
          className="bg-sky-200 cursor-pointer rounded border-none px-4 leading-7 hover:bg-sky-600 hover:text-gray-50"
          onClick={todayHandler}
          >
          {CalendarContext.today}
        </button>
      </div>
    </div>
  );
}
