import { CSSProperties, ReactNode, useState } from 'react';
import { Dayjs } from 'dayjs';
import classnames from 'classnames';
import Header from './Header';
import MonthCalendar from './MonthCalendar';
import { LocaleContext } from './LocaleContext';
import './index.css';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 自定义日期渲染，完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 自定义日期单元格渲染，内容添加到单元格，只在全屏日历模式生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化
  locale?: string;
  onChange?: (value: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className,locale } = props;

  const cs = classnames('w-full', className);

  return (
    <LocaleContext.Provider value={{
      locale: locale || navigator.language,
    }}>
      <div className={cs} style={style}>
        <Header />
        <MonthCalendar {...props} />
      </div>
      ;
    </LocaleContext.Provider>
  );
}

export default Calendar;
