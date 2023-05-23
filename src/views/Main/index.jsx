import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService.js';
import SelectInput from '../../components/SelectInput';
import { Modal } from '../../components';
import ModalChildren from './ModalChildren';
import DownloadQR from '../../components/DownloadQR';

const Main = () => {
  const params = useParams();
  console.log('params', params['*']);
  const [questions, setQuestions] = useState([]);

  const [modalShown, setModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  // const OnUpdate = () => {
  //   AppwriteService.updateGuestGroup({
  //     welcomeText,
  //     priority,
  //     guestName: name,
  //     guestGroupId: '103e5a19-56c8-4161-be9e-f09b8800c6f8',
  //     isRemoveGuest: true,
  //     guests: ['6463aab50c38ba25e3a0'],
  //   });
  // };

  const onShowModalPress = () => {
    setModalTitle('Редактировать гостя');
    setModalProps({ guestId: '646a184200d6d617317b' });
    setModalShown(true);
  };

  return (
    <>
      <Header />
      <button onClick={() => AppwriteService.deleteSession()}>delete session</button>
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
      <button onClick={onShowModalPress}>show modal</button>
      <div>
        <DownloadQR groupId='dd967318-7c56-41ce-8e00-3cef060880e2' />
      </div>

      {modalShown && (
        <Modal setShown={setModalShown} title={modalTitle}>
          <ModalChildren
            setModalShown={setModalShown}
            {...modalProps}
            // guestId='646a184200d6d617317b'
            // groupId='3e4feaa8-c195-48f0-a013-c4aecd711b4e'
          />
        </Modal>
      )}
    </>
  );
};

export default Main;
