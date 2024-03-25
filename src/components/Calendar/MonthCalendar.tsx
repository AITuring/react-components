import { useContext } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarProps } from '.';
import { LocaleContext } from './LocaleContext';
import allLocales from './locale';

interface MonthCalendarProps extends CalendarProps {}

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

  console.log(daysInfo);
  return daysInfo;
}

function renderDays(
  dayInfo: DayInfo[],
  dateRender: MonthCalendarProps['dateRender'],
  dateInnerContent: MonthCalendarProps['dateInnerContent'],
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
        >
          {dateRender ? (
            dateRender(day.date)
          ) : (
            <div className="p-3">
              <div className="calendar-month-body-cell-date-value">
                {day.date.date()}
              </div>
              <div className="calendar-month-body-cell-date-content">
                {dateInnerContent?.(day.date)}
              </div>
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
  const { dateRender, dateInnerContent } = props;

  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const allDays = getAllDays(props.value);

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
        <div>{renderDays(allDays, dateRender, dateInnerContent)}</div>
      </div>
    </div>
  );
}

export default MonthCalendar;
