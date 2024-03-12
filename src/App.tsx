import { useState, useRef, useEffect } from 'react';
import MiniCalendar from './components/MiniCalendar';
import { MiniCalendarRef } from './components/MiniCalendar';

const App = () => {
  const miniCalendarRef = useRef<MiniCalendarRef>(null);

  useEffect(() => {
    console.log(miniCalendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      miniCalendarRef.current?.setDate(new Date(2024, 2, 1));
    }, 3000);
  }, []);

  return (
    <div className="App">
      <MiniCalendar value={new Date('2024-3-1')} onChange={(data: Date) => alert(data.toLocaleDateString())} />
      <MiniCalendar value={new Date('2024-2-29')} ref={miniCalendarRef}  />
    </div>
  )
};

export default App;
