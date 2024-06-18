import './App.css';
import { UserInfoProvider } from './context/UserInfoContext';
import { UserWsProvider } from './context/UserWsContext';
import { UserContactProvider } from './context/UserContactContext';
import RegisterPage, { action as registerAction } from './pages/RegisterPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import Root, { loader as rootLoader } from './pages/Root';
import ChatPage, { loader as chatLoader } from './pages/ChatPage';
import ChatPageIndex from './pages/ChatPageIndex';
import ContactPage from './pages/ContactPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ChatRoom, { loader as chatRoomLoader } from './components/ChatRoom';
import { createContext, useState } from 'react';
import PluginPage from './pages/PluginPage';

const router = createBrowserRouter([
  {
    path: "/Register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <LoginPage />,
    // action: loginAction,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat",
        element: <ChatPage />,
        children: [
          {
            index: true,
            element: <ChatPageIndex /> 
          },
          {
            path: ":FriendID",
            element: <ChatRoom />,
          }
        ]
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "plugin",
        element: <PluginPage />
      },
    ]
  },
]);



function App() {
  
  return (
    <UserInfoProvider>
      <UserContactProvider>
        <UserWsProvider>
          <RouterProvider router={router} />
        </UserWsProvider>
      </UserContactProvider>
    </UserInfoProvider>
  );
}

export default App;
