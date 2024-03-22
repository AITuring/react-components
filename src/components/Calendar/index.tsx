import {Dayjs} from 'dayjs';
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import './index.css';

export interface CalendarProps {
  value: Dayjs;
}

function Calendar(props: CalendarProps) {
  return <div className="w-full">
    <Header />
    <MonthCalendar {...props} />
  </div>;
}

export default Calendar;
