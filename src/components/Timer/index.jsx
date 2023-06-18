import { useEffect, useMemo, useState } from 'react';

import s from './Timer.module.scss';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({ deadline = 'August, 25, 2023, 15:00:00' }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(parsedDeadline - Date.now()), 1000);

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  const createLabel = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${
      titles[
        Math.floor(number) % 100 > 4 && Math.floor(number) % 100 < 20
          ? 2
          : cases[Math.floor(number) % 10 < 5 ? Math.floor(number) % 10 : 5]
      ]
    }`;
  };

  return (
    <div className={s.timer}>
      {Object.entries({
        [createLabel(time / DAY, ['День', 'Дня', 'Дней'])]: time / DAY,
        [createLabel((time / HOUR) % 24, ['Час', 'Часа', 'Часов'])]: (time / HOUR) % 24,
        [createLabel((time / MINUTE) % 60, ['Минута', 'Минуты', 'Минут'])]: (time / MINUTE) % 60,
        [createLabel((time / SECOND) % 60, ['Секунда', 'Секунды', 'Секунд'])]: (time / SECOND) % 60,
      }).map(([label, value]) => (
        <div key={label} className={s.col}>
          <p className={s.number}>{`${Math.floor(value)}`.padStart(2, '0')}</p>
          <span className={s.text}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Timer;
