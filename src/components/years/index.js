import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const YearsComponent = () => {

  const { currentDate, setCurrentDate, events } = useContext(CalendarContext);

  const [year, setYear] = useState(currentDate.getFullYear());

  const halfCount = 12;

  const hasEventsInYear = (year) => {
    const eventsForYear = events[year] || [];
    return eventsForYear.length > 0;
  };  
  const nextPage = () => {
    setYear((prevYear) => prevYear + 25);
  };
  const prevPage = () => {
    setYear((prevYear) => prevYear - 25);
  };

  const click = (year) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  return (
    <div className='years-wrapper content-wrapper'>
      <div className='header'>
        <FontAwesomeIcon icon={faArrowLeft} className='arrow-left' onClick={prevPage} />
        {year}
        <FontAwesomeIcon icon={faArrowRight} className='arrow-right' onClick={nextPage} />
      </div>
      {
  Array(halfCount).fill(null).map((_el, index) => {
    const showYear = year - halfCount + index;
    const hasEvents = hasEventsInYear(showYear);

    return (
      <div
        className={`year content-item ${hasEvents ? 'has-events' : ''}`}
        onClick={() => click(showYear)}
      >
        {showYear}
      </div>
    );
  })
}
      <div className='year content-item' onClick={() => click(year)} >{year}</div>
      {
        Array(halfCount)
          .fill(null)
          .map((_el, index) => {
            const showYear = year + index + 1;
            return (
              <div className='year content-item' onClick={() => click(showYear)} >
                {showYear}
              </div>);
          })
      }
    </div>
  );
};

export default YearsComponent;