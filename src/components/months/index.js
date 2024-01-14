import { useContext } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const MonthsComponent = () => {

 const { setCurrentDate, currentDate, events } = useContext(CalendarContext);

 const hasEventsInMonth = (monthIndex) => {
  const key = `${currentDate.getFullYear()}-${monthIndex}-${currentDate.getDate()}`;
  const eventsForMonth = events[key] || [];
  return eventsForMonth.length > 0;
};

 const click = (index) => {
  setCurrentDate((preCurrentDate) => {
   const newDate = new Date(preCurrentDate);
   newDate.setMonth(index);
   return newDate;
  });


 };

 return (
    <div className='months-wrapper content-wrapper'>
      <div className='header'>{MONTHS[currentDate.getMonth()]}</div>
      {
  MONTHS.map((month, i) => (
    <div
      className={`month content-item ${hasEventsInMonth(i) ? 'has-events' : ''}`}
      onClick={() => click(i)}
    >
      {month}
    </div>
  ))
}
    </div>
  );
};

export default MonthsComponent;