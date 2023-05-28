import React, { useEffect, useMemo, useState } from 'react';
import AppwriteService from '../../../services/AppwriteService';
import styles from './ModalChildren.module.css';
import { SelectInput } from '../../../components';

const ModalChildren = ({ setModalShown, groups, guestId, groupId, setQuantityChanges }) => {
  const [currOption, setCurrOption] = useState(null);

  const [name, setName] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [priority, setPiority] = useState('');
  const [groupName, setGroupName] = useState('');

  const [modalOperationLoading, setModalOperationLoading] = useState(false);

  useEffect(() => {
    if (guestId) {
      AppwriteService.getGuest(guestId, (guest) => {
        setName(guest.guestName);
      });
    }
  }, [guestId]);

  useEffect(() => {
    if (groupId) {
      AppwriteService.getGuestGroups({ groupIds: [groupId] }, (group) => {
        setWelcomeText(group[0].welcomeText);
        setPiority(group[0].priority);
        setGroupName(group[0].groupName);
        setCurrOption({ value: group[0].groupName, label: group[0].groupName });
      });
    }
  }, [groupId]);

  const onGroupNameChange = ({ target: { value } }) => {
    setGroupName(value);
  };

  const onNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const onWelcomeChange = ({ target: { value } }) => {
    setWelcomeText(value);
  };

  const onPriorityChange = ({ target: { value } }) => {
    setPiority(value);
  };

  const onRequestPending = () => setModalOperationLoading(true);
  const onRequestSuccess = () => {
    setModalOperationLoading(false);
    setModalShown(false);
    //setQuantityChanges((prev) => prev + 1);
  };

  const onSubmitPress = () => {
    let data = {};
    if (guestId) {
      data = { guestName: name, guestId };
    } else if (groupId) {
      data = { welcomeText, priority, groupName, guestGroupId: groupId, guests: [] };
    } else {
      data = isNewGroup
        ? { welcomeText, priority, groupName, guestName: name }
        : { guestName: name, groupId: groups?.find((group) => group.groupName === currOption.value).$id };
    }
    AppwriteService[guestOperation](data, onRequestPending, onRequestSuccess);
  };

  const onDeletePress = () => {
    AppwriteService.deleteGuestGroup({ groupId }, onRequestPending, onRequestSuccess);
  };

  const options = useMemo(
    () => [
      ...groups?.map((group) => ({ value: group.groupName, label: group.groupName })),
      { value: 'Создать группу', label: 'Создать группу' },
    ],
    [groups],
  );

  const guestOperation = useMemo(() => {
    if (guestId) {
      return 'updateGuest';
    } else {
      return groupId ? 'updateGuestGroup' : 'createGuest';
    }
  }, [guestId, groupId]);

  const isNewGroup = useMemo(() => currOption?.label === 'Создать группу', [currOption]);

  return (
    <div className={styles.container}>
      {!groupId && <input type='text' value={name} onChange={onNameChange} placeholder='Имя гостя' />}
      {!guestId && !groupId && (
        <SelectInput question='Выберите группу' options={options} onSelectChange={setCurrOption} value={currOption} />
      )}
      {(isNewGroup || groupId) && (
        <div className={styles.container}>
          <input type='text' value={groupName} onChange={onGroupNameChange} placeholder='Название группы' />
          <input type='text' value={welcomeText} onChange={onWelcomeChange} placeholder='Уникальное обращение' />
          <input type='text' value={priority} onChange={onPriorityChange} placeholder='Приоритет' />
        </div>
      )}
      <button onClick={onSubmitPress} disabled={modalOperationLoading}>
        {modalOperationLoading ? 'Подождите...' : groupId || guestId ? 'Обновить' : 'Создать'}
      </button>
      {groupId && (
        <button onClick={onDeletePress} disabled={modalOperationLoading}>
          Удалить
        </button>
      )}
    </div>
  );
};

export default ModalChildren;
