import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './ButtonGroup.module.sass';
import buttonOptions from './buttonOptions';

function ButtonGroup () {
  const [selectedId, setSelectedId] = useState(1);

  const handleClick = id => {
    setSelectedId(id);
    ы;
  };

  return (
    <div className={styles.buttonGroup}>
      <h3 className={styles.title}>
        Do you want a matching domain (.com URL) with your name?
      </h3>
      <div className={styles.buttons}>
        {buttonOptions.map(option => (
          <button
            key={option.id}
            className={`${styles.button} ${
              selectedId === option.id ? styles.active : ''
            }`}
            onClick={() => handleClick(option.id)}
          >
            <div className={styles.labelContainer}>
              <span className={styles.label}>{option.label}</span>
              {option.recommended && (
                <span className={styles.recommended}>Recommended</span>
              )}
            </div>
            <p className={styles.description}>{option.description}</p>
            {selectedId === option.id && (
              <FaCheck className={styles.checkIcon} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
