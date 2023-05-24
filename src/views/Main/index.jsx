import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService.js';
import SelectInput from '../../components/SelectInput';
import { Modal } from '../../components';
import ModalChildren from '../Admin/ModalChildren';
import DownloadQR from '../../components/DownloadQR';

const Main = () => {
  const params = useParams();
  console.log('params', params['*']);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  return (
    <>
      <Header />
      <div>
        В верхней части страницы находится индивидуальное обращение. Если его нет, то вместо него выводится
        “Дорогой/ая/ие” и имя/имена гостя/гостей. Первая часть обращения выводится в зависимости от пола гостя
        (“дорогой” для мужского, “дорогая” для женского) или для группы гостей (“дорогие”).
      </div>
      <div>Далее размещена подробная информация о дате, месте проведения и остальных деталях мероприятия</div>
      <div>
        <div>
          {questions?.map((el) => (
            <SelectInput
              key={1}
              isMulty={el?.allowMiltyAnswer}
              question={el?.questionTitle}
              changeCallback={(e) => console.log(e)}
              options={el?.answers?.map((an) => {
                return {
                  value: an,
                  label: an,
                };
              })}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
