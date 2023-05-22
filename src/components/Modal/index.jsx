import React from 'react';
import styles from './Modal.module.css';
import { Icon } from '../index';

const Modal = ({ setShown, title, children }) => {
  return (
    <>
      <div className={styles.overlay} onClick={() => setShown(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setShown(false)}>
            <Icon iconName="cross" iconHeight="15px" iconWidth="15px" />
          </button>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
