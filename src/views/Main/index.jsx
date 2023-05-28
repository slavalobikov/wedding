import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService.js';
import styles from './main.module.scss';
import { Overlay, Questionire, SelectInput } from '../../components';

const Main = () => {
  const { id = '8505667d-f92e-4f29-8b64-27264e95e737' } = useParams();
  const [group, setGroup] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [guestId, setGuestId] = useState('');

  useEffect(() => {
    if (id) {
      AppwriteService.getGuestGroups({ groupIds: [id] }, (res) => setGroup(res[0]));
    }
  }, [id]);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  const options = useMemo(
    () => group?.guests.map((guest) => ({ value: guest.guestId, label: guest.guestName })),
    [group],
  );

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header />
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
            onSelectChange={({ value }) => setGuestId(value)}
          />
          {!group && <Overlay style={styles.overlay} overlayText='Подождите' />}
        </div>
        <div className={styles.questionire}>
          <Questionire questions={questions} guestId={guestId} />
          {!guestId && <Overlay style={styles.overlay} overlayText='Выберите гостя' />}
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
