import logo from './logo.svg';
import './App.css';
import RegisterPage, { action as registerAction } from './pages/RegisterPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import Root, { loader as rootLoader } from './pages/Root';
import ChatPage, { loader as chatLoader } from './pages/ChatPage';
import ChatPageIndex from './pages/ChatPageIndex';
import ContactPage from './pages/ContactPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ChatRoom from './components/ChatRoom';
import FriendInfo from './components/FriendInfo';
import { createContext, useState } from 'react';
import PluginPage from './pages/PluginPage';
import SettingsPage from './pages/SettingsPage';
import { UserInfoProvider } from './context/UserInfoContext';
import { UserWsProvider } from './context/UserWsContext';

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
            element: <ChatRoom />
          },
          {
            path: ":friend-name",
            element: <ChatRoom />,
          }
        ]
      },
      {
        path: "contact",
        element: <ContactPage />,
        children: [
          {
            index: true,
            element: <FriendInfo />
          },
          {
            path: ":friend-name",
            element: <FriendInfo />,
          }
        ]
      },
      {
        path: "plugin",
        element: <PluginPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      }
    ]
  },
]);



function App() {

  return (
    <UserInfoProvider>
      <UserWsProvider>
        <RouterProvider router={router} />
      </UserWsProvider>
    </UserInfoProvider>
  );
}

export default App;
