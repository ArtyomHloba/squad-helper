import React, { useState, useEffect } from 'react';
import { IoIosTimer } from 'react-icons/io';
import EventForm from './../../components/EventForm/EventForm';
import EventItem from './../../components/EventItem/EventItem';
import styles from './EventPage.module.sass';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = newEvent => {
    setEvents(prevEvents =>
      [...prevEvents, newEvent].sort((a, b) => a.eventTime - b.eventTime)
    );
  };

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

  return (
    <div className={styles.eventsPage}>
      <EventForm
        addEvent={addEvent}
        clearExpiredEvents={clearExpiredEvents}
        expiredEventsCount={expiredEventsCount}
      />

      <div className={styles.eventsList}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleEventList}>Live Upcoming Checks</h1>
          <div className={styles.timerContainer}>
            <p className={styles.remainingTime}>Remaining Time</p>
            <IoIosTimer className={styles.ioIosTimer} />
          </div>
        </div>

        {events.map(event => (
          <EventItem
            key={event.eventTime}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
