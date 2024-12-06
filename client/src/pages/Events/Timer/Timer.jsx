import React from 'react';
import Countdown from 'react-countdown';
import { FaTrash } from 'react-icons/fa6';
import styles from './Timer.module.sass';

const Timer = ({ event, deleteEvent }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className={styles.expired}>The event is over!</span>;
    }

    return (
      <div className={styles.eventItem}>
        <div className={styles.eventInfo}>
          <span className={styles.eventName}>{event.name}</span>
        </div>
        <div className={styles.eventTime}>
          {days}d {hours}h {minutes}m {seconds}s
        </div>
        <button className={styles.delete} onClick={() => deleteEvent(event)}>
          <FaTrash />
        </button>
      </div>
    );
  };

  return <Countdown date={event.eventTime} renderer={renderer} />;
};

export default Timer;
