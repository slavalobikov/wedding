import { useNavigate } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService';
import { useEffect, useState } from 'react';
import { Icon, Modal, Questionire, DownloadQR, Button, Statistics } from '../../components';
import ModalChildren from './ModalChildren';
import { ROUTES } from '../../utils/const';
import s from './admin.module.scss';

const Admin = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [statistics, setStatistics] = useState([]);
  console.log('STATISTICS ', statistics);

  const [modalShown, setModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem('_session')) {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  useEffect(() => {
    AppwriteService.getGuestGroups({ groupIds: [] }, (res) => setGroups(res));
  }, []);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  useEffect(() => {
    AppwriteService.getStatistics(setStatistics);
  }, []);

  const onShowModalPress = ({ groupId, guestId, modalTitle }) => {
    setModalTitle(modalTitle);
    setModalProps({ groupId, guestId });
    setModalShown(true);
  };

  return (
    <div className={s.container}>
      <button onClick={() => AppwriteService.deleteSession(navigate)}>delete session</button>
      <div>
        <div data-header={true} className={s.table}>
          <div className={s.table_first}>гости</div>
          <div className={s.table_second}>обращение</div>
          <div className={s.table_third}>приоритет</div>
        </div>
        {groups?.map((el, index) => (
          <div data-header={false} key={index} className={s.table}>
            <div className={s.table_first}>
              <div
                onClick={() =>
                  onShowModalPress({
                    groupId: el.$id,
                    modalTitle: 'Редактировать группу',
                  })
                }
                className={s.groupName}
              >
                {el.groupName} <Icon iconName={'edit'} iconWidth={12} iconHeight={15} />
              </div>
              <ol>
                {el?.guests?.map((g, index) => (
                  <li
                    onClick={() =>
                      onShowModalPress({
                        guestId: g.guestId,
                        modalTitle: 'Редактировать гостя',
                      })
                    }
                    key={index}
                  >
                    {g?.guestName} <Icon iconName={'edit'} iconWidth={12} iconHeight={15} />
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.table_second}>{el.welcomeText}</div>
            <div className={s.table_third}>
              <div className={s.wrapper}>
                {el.priority}
                <DownloadQR groupName={el.groupName} id={el.$id} />
              </div>
            </div>
          </div>
        ))}
        <Button text='Добавить гостя' icon='plus' onClick={() => onShowModalPress({ modalTitle: 'Создать гостя' })} />
      </div>

      <Questionire questions={questions} />

      <Statistics statisticsData={statistics} />
      
      {modalShown && (
        <Modal setShown={setModalShown} title={modalTitle}>
          <ModalChildren
            setModalShown={setModalShown}
            groups={groups}
            {...modalProps}
            // guestId='646a184200d6d617317b'
            // groupId='3e4feaa8-c195-48f0-a013-c4aecd711b4e'
          />
        </Modal>
      )}
    </div>
  );
};

export default Admin;
