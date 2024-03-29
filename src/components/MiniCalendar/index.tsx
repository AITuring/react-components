import { useState,useImperativeHandle, forwardRef} from 'react';
import './index.css';

interface MiniCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export interface MiniCalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const MiniCalendar = forwardRef<MiniCalendarRef, MiniCalendarProps> ((props, ref) => {
  const { value, onChange } = props;

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date)
      }
    }
  });

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];
  const [date, setDate] = useState(value || new Date());

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }

  const renderDays = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty=${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandle = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));


      if (i === date.getDate()) {
        days.push(<div key={`day=${i}`} className="day selected" onChange={clickHandle}>{i}</div>);
      } else {
        days.push(<div key={`day=${i}`} className="day" onClick={clickHandle}>{i}</div>);
      }
    }

    return days;
  }


  return (
    <div className="h-[280px] w-[300px] p-[10px] m-[10px] border-[1px] border-solid border-gray-400 bg-gray-200">
      <div className="h-[40px] flex justify-between items-center">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="flex flex-wrap">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
})

export default MiniCalendar;
