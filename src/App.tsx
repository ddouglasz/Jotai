import React, { Suspense } from "react";
import { IntlProvider } from 'react-intl';
import styled from '@emotion/styled';
import "./App.css";
import UserProfile from "./components/UserProfile";
import UserTodos from "./components/UserTodos";

const Header = styled.h1`
  top: 10%;
  position: absolute;
  left: 40%;
  color: hsl(240, 64%, 58%);
`;

function App() {
  return (
    <IntlProvider locale='' >
      <div className="App">
        <Header >
          Todos App with Jotai 👻
        </Header>
        <Suspense fallback={<div>Loading user profile...</div>}>
          <UserProfile />
        </Suspense>
        <UserTodos />
      </div>
      </IntlProvider>
  );
}

export default App;
