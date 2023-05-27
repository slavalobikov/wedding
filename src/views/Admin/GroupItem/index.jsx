import DownloadQR from '../../../components/DownloadQR';
import s from './groupItem.module.scss';
import { useState } from 'react';
import { Modal } from '../../../components';
import ModalChildren from '../ModalChildren';

const GroupItem = ({ info }) => {
  const { groupName, guests } = info;
  return (
    <div className={s.wrapper}>
      <div>
        {groupName}
        <ul>
          {guests.map((el) => (
            <li style={{ color: 'red' }} key={el.guestId}>
              {el.guestName}
            </li>
          ))}
        </ul>
      </div>
      <div></div>
      <div>
        {/* {info?.groupName}
        <DownloadQR id={info?.$id} />*/}
      </div>
    </div>
  );
};

export default GroupItem;
