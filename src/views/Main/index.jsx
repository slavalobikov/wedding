import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService.js';
import styles from './main.module.scss';
import { Overlay, Questionire, SelectInput } from '../../components';

const Main = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [guestId, setGuestId] = useState('');

  const [questionireLoading, setQuestionireLoading] = useState(true);

  const options = useMemo(
    () => group?.guests.map((guest) => ({ value: guest.guestId, label: guest.guestName })),
    [group],
  );

  useEffect(() => {
    if (id) {
      AppwriteService.getGuestGroups({ groupIds: [id] }, (res) => setGroup(res[0]));
    }
  }, [id]);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  useEffect(() => {
    if (options) {
      setGuestId(options[0].value);
    }
  }, [options]);

  const onSelectChange = (value) => {
    setQuestionireLoading(true);
    setGuestId(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header />
        <div>{group?.welcomeText}</div>
        <div>
          В верхней части страницы находится индивидуальное обращение. Если его нет, то вместо него выводится
          “Дорогой/ая/ие” и имя/имена гостя/гостей. Первая часть обращения выводится в зависимости от пола гостя
          (“дорогой” для мужского, “дорогая” для женского) или для группы гостей (“дорогие”).
        </div>
        <div>Далее размещена подробная информация о дате, месте проведения и остальных деталях мероприятия</div>
        <div className={styles.questionire}>
          <SelectInput
            style={styles.guestSelect}
            question='Выберите гостя, который заполняет опросник'
            options={options}
            onSelectChange={({ value }) => onSelectChange(value)}
            value={options && (options.find(({ value }) => value === guestId) || options[0])}
            disabledOptions={[guestId]}
          />
          {!options && !group && <Overlay style={styles.overlay} overlayText='Подождите...' />}
        </div>
        <div className={styles.questionire}>
          <Questionire questions={questions} guestId={guestId} overlayCallback={setQuestionireLoading} />
          {(!guestId || questionireLoading) && <Overlay style={styles.overlay} overlayText='Подождите...' />}
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore?
          Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex
          similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam
          culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur iste neque
          distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi reprehenderit
          iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur
          iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat ratione eaque quasi
          reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto, autem sint repellat
          ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias, architecto,
          autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Suscipit consequatur iste neque distinctio ex similique tempore? Molestias,
          architecto, autem sint repellat ratione eaque quasi reprehenderit iure aliquam culpa alias atque.
        </div>
      </div>
    </div>
  );
};

export default Main;
