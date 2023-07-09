import { memo, useState } from 'react';

import styles from './Statistics.module.scss';
import Modal from '../Modal';

const ModalContent = ({ guests }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    {guests?.map((guest) => (
      <p key={guest}>{guest}</p>
    ))}
  </div>
);

const MemoStatistic = ({ questionTitle, answers }) => {
  const [opened, setOpened] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <>
      <div className={styles.statistic} onClick={() => setOpened((p) => !p)}>
        <div className={styles.statisticHeader}>
          <p>{questionTitle}</p>
          <div className={`${styles.arrow} ${opened && styles.up}`} />
        </div>

        <div className={`${styles.statisticContent} ${opened && styles.statisticContent__shown}`}>
          <hr className={styles.devider} />
          {answers.map(({ answerTitle, guests }) => (
            <div
              key={answerTitle}
              className={styles.answer}
              onClick={(e) => {
                e.stopPropagation();
                setModalData({ title: answerTitle, guests });
              }}
            >{`${answerTitle} (${guests.length})`}</div>
          ))}
        </div>
      </div>

      {modalData && (
        <Modal title={modalData.title} setShown={setModalData}>
          <ModalContent guests={modalData.guests} />
        </Modal>
      )}
    </>
  );
};

const Statistic = memo(MemoStatistic);
export default Statistic;
