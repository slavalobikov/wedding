import { useEffect, useMemo, useState } from "react";

import s from './Timer.module.scss';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({ deadline = 'August, 25, 2023, 15:00:00' }) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);

    return (
        <div className={s.timer}>
            {Object.entries({
                "Дней": time / DAY,
                "Часов": (time / HOUR) % 24,
                "Минут": (time / MINUTE) % 60,
                "Секунд": (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className={s.col_4}>
                    <div className={s.box}>
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timer;