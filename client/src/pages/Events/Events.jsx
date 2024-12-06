import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { IoIosTimer } from 'react-icons/io';
import Timer from './Timer/Timer';
import validationSchemas from '../../utils/validators/validationSchems';
import styles from './Events.module.sass';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const deleteEvent = eventToDelete => {
    setEvents(prevEvents =>
      prevEvents.filter(event => event !== eventToDelete)
    );
  };

  const clearExpiredEvents = () => {
    const activeEvents = events.filter(event => event.eventTime > Date.now());
    setEvents(activeEvents);
  };

  const expiredEventsCount = events.filter(
    event => event.eventTime < Date.now()
  ).length;

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      date: '',
      time: '',
      notifyBefore: '',
    },
    validationSchema: validationSchemas.TimerEventSchema,
    onSubmit: ({ name, date, time, notifyBefore }) => {
      const eventTime = new Date(`${date}T${time}`).getTime();

      if (eventTime < Date.now()) {
        alert('The date must be in the future!');
        return;
      }

      const notifyTime = eventTime - notifyBefore * 60 * 1000;
      const newEvent = { name, eventTime, notifyTime };

      setEvents(prevEvents =>
        [...prevEvents, newEvent].sort((a, b) => a.eventTime - b.eventTime)
      );

      resetForm();
    },
  });

  return (
    <div className={styles.eventsPage}>
      <div className={styles.menuItem}>
        {expiredEventsCount > 0 && (
          <span className={styles.badge}>{expiredEventsCount}</span>
        )}
      </div>

      <div className={styles.eventForm}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Event Name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.nameOfEventInput}
          />
          {touched.name && errors.name && (
            <div className={styles.error}>{errors.name}</div>
          )}

          <input
            type='date'
            name='date'
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.dateOfEventInput}
          />
          {touched.date && errors.date && (
            <div className={styles.error}>{errors.date}</div>
          )}

          <input
            type='time'
            name='time'
            value={values.time}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.timeOfEventInput}
          />
          {touched.time && errors.time && (
            <div className={styles.error}>{errors.time}</div>
          )}

          <input
            type='number'
            name='notifyBefore'
            placeholder='Reminder Time (min)'
            value={values.notifyBefore}
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            className={styles.numberOfEventInput}
          />
          {touched.notifyBefore && errors.notifyBefore && (
            <div className={styles.error}>{errors.notifyBefore}</div>
          )}
          <div className={styles.btnContainer}>
            <button className={styles.addBnt} type='submit'>
              Add Event
            </button>

            <button
              onClick={clearExpiredEvents}
              className={styles.clearExpired}
            >
              Clear completed events
            </button>
          </div>
        </form>
      </div>

      <div className={styles.eventsList}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleEventList}>Live Upcoming Checks</h1>
          <div className={styles.timerContainer}>
            <p className={styles.remainingTime}>Remaining Time</p>
            <IoIosTimer className={styles.ioIosTimer} />
          </div>
        </div>
        {events.map(event => (
          <Timer
            key={event.eventTime}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
