import { useNavigate } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService';
import editIcon from '../../assets/edit.svg';
import download from '../../assets/fileDownloadIcon.svg';

import { useEffect, useState } from 'react';
import { Modal } from '../../components';
import ModalChildren from './ModalChildren';
import s from './admin.module.scss';
import DownloadQR from '../../components/DownloadQR';

const Admin = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState(0);

  const [modalShown, setModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    AppwriteService.getGuestGroups({ groupIds: [] }, (res) => setGroups(res));
  }, [quantityChanges]);

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
              {el.groupName} <img src={editIcon} alt='edit' />
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
                  {g?.guestName} <img src={editIcon} alt='edit' />
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
      {/*{groups?.map((el, index) => (
          <GroupItem key={index} info={el} />
        ))}*/}
      <button
        onClick={() =>
          onShowModalPress({
            /*{ groupId: 'dd967318-7c56-41ce-8e00-3cef060880e2' }*/
          })
        }
      >
        show modal
      </button>
      {modalShown && (
        <Modal setShown={setModalShown} title={modalTitle}>
          <ModalChildren
            setQuantityChanges={setQuantityChanges}
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
