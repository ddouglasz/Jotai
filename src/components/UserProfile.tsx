import React from 'react';
import { useAtom } from 'jotai';
import { userProfileAtom, userIdAtom } from '../atoms';

function UserProfile() {
  const [user] = useAtom(userProfileAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  console.log({userProfileAtom})

  const switchUser = () => setUserId(userId === 1 ? 2 : 1);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={switchUser}>Switch User</button>
    </div>
  );
}

export default UserProfile;
