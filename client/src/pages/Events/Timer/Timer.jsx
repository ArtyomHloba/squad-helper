import React from 'react';
import Countdown from 'react-countdown';
import styles from './Timer.module.sass';

const Timer = ({ event, deleteEvent }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className={styles.expired}>Час вийшов!</span>;
    } else {
      return (
        <span>
          {days}д {hours}г {minutes}хв {seconds}с
        </span>
      );
    }
  };

  return (
    <div className={styles.timer}>
      <span>{event.name}</span>
      <Countdown date={event.eventTime} renderer={renderer} />
      <button onClick={() => deleteEvent(event)}>Видалити</button>
    </div>
  );
};

export default Timer;
