import { useNavigate } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService';
import GroupItem from './GroupItem';
import { useEffect, useState } from 'react';
import { Modal } from '../../components';
import ModalChildren from './ModalChildren';

const Admin = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  const [modalShown, setModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    AppwriteService.getGuestGroups({ groupIds: [] }, (res) => setGroups(res));
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
      {groups?.map((el) => (
        <GroupItem key={el.$id} info={el} />
      ))}
      <button onClick={() => onShowModalPress({ groupId: 'dd967318-7c56-41ce-8e00-3cef060880e2' })}>show modal</button>
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
