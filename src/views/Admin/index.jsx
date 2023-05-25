import AppwriteService from '../../services/AppwriteService';
import GroupItem from './GroupItem';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    AppwriteService.getGuestGroups({groupIds: []}, (res) => setGroups(res));
  }, []);

  return (
    <div>
      Admin page
      <button onClick={() => AppwriteService.deleteSession()}>delete session</button>
      {groups?.map((el) => (
        <GroupItem key={el.$id} info={el} />
      ))}
    </div>
  );
};

export default Admin;
