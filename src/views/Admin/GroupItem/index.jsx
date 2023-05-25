import DownloadQR from '../../../components/DownloadQR';
import { useState } from 'react';
import { Modal } from '../../../components';
import ModalChildren from '../ModalChildren';

const GroupItem = ({ info }) => {
  const [modalShown, setModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState(null);

  const onShowModalPress = () => {
    setModalTitle('Редактировать гостя');
    setModalProps({ groupId: info?.$id });
    // setModalProps({ guestId: '646a184200d6d617317b' });
    setModalShown(true);
  };
  return (
    <div>
      {info?.groupName}
      <DownloadQR id={info?.$id} />

      <button onClick={onShowModalPress}>show modal</button>

      {modalShown && (
        <Modal setShown={setModalShown} title={modalTitle}>
          <ModalChildren
            info={info}
            setModalShown={setModalShown}
            {...modalProps}
            // guestId='646a184200d6d617317b'
            // groupId='3e4feaa8-c195-48f0-a013-c4aecd711b4e'
          />
        </Modal>
      )}
    </div>
  );
};

export default GroupItem;
