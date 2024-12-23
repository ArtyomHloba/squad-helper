import React from 'react';
import { useFormik } from 'formik';
import validationSchemas from '../../utils/validators/validationSchems';
import styles from './EventForm.module.sass';

const EventForm = ({ addEvent, clearExpiredEvents, expiredEventsCount }) => {
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
    validationSchema: validationSchemas.EventFormSchema,
    onSubmit: ({ name, date, time, notifyBefore }) => {
      const eventTime = new Date(`${date}T${time}`).getTime();

      if (eventTime < Date.now()) {
        alert('The date must be in the future!');
        return;
      }

      const notifyTime = eventTime - notifyBefore * 60 * 1000;
      addEvent({ name, eventTime, notifyTime });
      resetForm();
    },
  });

  return (
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
          <button className={styles.addBtn} type='submit'>
            Add Event
          </button>

          <button onClick={clearExpiredEvents} className={styles.clearExpired}>
            Clear completed events
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
