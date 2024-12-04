import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { FaTrash } from 'react-icons/fa6';
import styles from './Timer.module.sass';

const Timer = ({ event, deleteEvent }) => {
  const [progress, setProgress] = useState(0);

  const totalDuration = event.eventTime - event.notifyTime;

  const renderer = ({ days, hours, minutes, seconds, completed, total }) => {
    if (completed) {
      setProgress(100);
      return <span className={styles.expired}>Время вышло!</span>;
    }

    const currentProgress = 100 - (total / totalDuration) * 100;
    setProgress(currentProgress);

    return (
      <div className={styles.eventItem}>
        <div className={styles.eventInfo}>
          <span className={styles.eventName}>{event.name}</span>
          <span className={styles.eventTime}>
            {days}д {hours}ч {minutes}м {seconds}с
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
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
