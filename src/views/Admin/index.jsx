import { useNavigate } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService';
import GroupItem from './GroupItem';
import { useEffect, useState } from 'react';
import { Modal, Questionire } from '../../components';
import ModalChildren from './ModalChildren';
import { ROUTES } from '../../utils/const';

const Admin = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [questions, setQuestions] = useState([]);

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

  const onShowModalPress = ({ groupId, guestId }) => {
    setModalTitle('Редактировать гостя');
    setModalProps({ groupId, guestId });
    setModalShown(true);
  };

  return (
    <div>
      Admin page
      <button onClick={() => AppwriteService.deleteSession(navigate)}>delete session</button>
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
      <button onClick={() => onShowModalPress({ guestId: '647251a8666dc036c33c' })}>show modal</button>
      <Questionire questions={questions} />
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
