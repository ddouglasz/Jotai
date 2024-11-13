import React, { startTransition } from "react";
import Card from "@commercetools-uikit/card";
import PrimaryButton from "@commercetools-uikit/primary-button";
import { UsersIcon } from "@commercetools-uikit/icons";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { userProfileAtom, userIdAtom, todoStatsAtom } from "../atoms/atoms";

const UserProfileContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 10%;
  width: 300px;
`;

const UserProfile = () => {
  const [user] = useAtom(userProfileAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [stats] = useAtom(todoStatsAtom);

  if (!user) return <div>Loading...</div>;

  const switchUser = () => {
    startTransition(() => {
      setUserId(userId === 1 ? 2 : 1);
    });
  };
  return (
    <UserProfileContainer>
      <Card insetScale="xl">
        <h3>{user.name}'s To-Do List</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <div>
          <p>Total: {stats.total}</p>
          <p>Completed: {stats.completed}</p>
          <p>Pending: {stats.remaining}</p>
        </div>
        <PrimaryButton
          iconLeft={<UsersIcon />}
          label="Switch user"
          onClick={switchUser}
        />
      </Card>
    </UserProfileContainer>
  );
};

export default UserProfile;
