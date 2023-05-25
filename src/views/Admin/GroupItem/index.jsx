import DownloadQR from '../../../components/DownloadQR';
import { useState } from 'react';
import { Modal } from '../../../components';
import ModalChildren from '../ModalChildren';

const GroupItem = ({ info }) => {
  return (
    <div>
      {info?.groupName}
      <DownloadQR id={info?.$id} />
    </div>
  );
};

export default GroupItem;
