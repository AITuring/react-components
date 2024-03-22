import {Dayjs} from 'dayjs';
import MonthCalendar from './MonthCalendar';
import './index.css';

export interface CalendarProps {
  value: Dayjs;
}

function Calendar(props: CalendarProps) {
  return <div className="w-full">
    <MonthCalendar {...props} />
  </div>;
}

export default Calendar;
