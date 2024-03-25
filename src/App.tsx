import { useRef, useEffect } from 'react';
import Calendar from './components/Calendar';
// import MiniCalendar from './components/MiniCalendar';
import { MiniCalendarRef } from './components/MiniCalendar';
import dayjs from 'dayjs';

const App = () => {
  const miniCalendarRef = useRef<MiniCalendarRef>(null);

  useEffect(() => {

    setTimeout(() => {
      miniCalendarRef.current?.setDate(new Date(2024, 2, 1));
    }, 3000);
  }, []);

  return (
    <div className="App">
      <h2 className='text-3xl text-cyan-900 text-center mb-5'>Components</h2>
      <Calendar value={dayjs('2024-3-29')} dateInnerContent={(value) => {
        return <div>
          <p style={{background: 'yellowgreen', height: '30px'}}>{value.format('YYYY/MM/DD')}</p>
        </div>
      }}/>
      {/* <MiniCalendar value={new Date('2024-3-1')} onChange={(data: Date) => alert(data.toLocaleDateString())} />
      <MiniCalendar value={new Date('2024-2-29')} ref={miniCalendarRef}  /> */}
    </div>
  )
};

export default App;
