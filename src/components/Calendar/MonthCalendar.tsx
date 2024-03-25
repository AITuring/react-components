import { useContext, useState } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarProps } from '.';
import { LocaleContext } from './LocaleContext';
import allLocales from './locale';

interface MonthCalendarProps extends CalendarProps {
  selectHandler: (date: Dayjs) => void;
  curMonth: Dayjs;
}

interface DayInfo {
  date: Dayjs;
  currentMonth: boolean;
}


function getAllDays(date: Dayjs): Array<DayInfo> {
  const startDate = date.startOf('month');
  const day = startDate.day();

  const daysInfo: Array<DayInfo> = new Array(6 * 7);

  for (let i = 0; i < day; i++) {
    // 计算当前日期 -1、-2、-3 的日期
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    };
  }

  // 计算当前日期 +1、+2、+3 的日期
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}

function renderDays(
  dayInfo: DayInfo[],
  dateRender: MonthCalendarProps['dateRender'],
  dateInnerContent: MonthCalendarProps['dateInnerContent'],
  value: Dayjs,
  selectHandler: MonthCalendarProps['selectHandler'],
) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const day = dayInfo[i * 7 + j];
      row[j] = (
        <div
          className={
            day.currentMonth
              ? 'w-1/7 border border-gray-300 text-gray-600 overflow-hidden'
              : 'w-1/7 border border-gray-300 text-gray-300 overflow-hidden'
          }
          onClick={() => console.log(day)}
        >
          {dateRender ? (
            dateRender(day.date)
          ) : (
            <div className="p-3 cursor-pointer"  onClick={e => {
              e.stopPropagation();
              selectHandler?.(day.date)
            }}>
              <div className={
                value.format('YYYY-MM-DD') === day.date.format('YYYY-MM-DD')
                ? "bg-sky-500 text-white w-7 h-7 leading-7 rounded-full text-center cursor-pointer"
                : "w-7 h-7 leading-7 rounded-full text-center "
              }>
                {day.date.date()}
              </div>
              <div
                className="calendar-month-body-cell-date-content"
                >
                {dateInnerContent?.(day.date)}
              </div>
              <div>111</div>
            </div>
          )}
        </div>
      );
    }
    rows.push(row);
  }
  return rows.map((row) => <div className="h-24 flex">{row}</div>);
}

function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);
  const { value, dateRender, dateInnerContent, selectHandler, curMonth } = props;

  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const allDays = getAllDays(curMonth);

  return (
    <div>
      <div className="p-4">
        <div className="flex w-full box-border border-b border-gray-200">
          {weekList.map((item) => (
            <div key={item} className="px-5 py-4 text-left flex-1">
              {CalendarLocale.week[item]}
            </div>
          ))}
        </div>
        <div>{renderDays(allDays, dateRender, dateInnerContent, value, selectHandler)}</div>
      </div>
    </div>
  );
}

export default MonthCalendar;
