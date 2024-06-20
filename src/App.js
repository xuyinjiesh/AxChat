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
import FriendInfo from './components/FriendInfo';
import FriendSearch from './components/FriendSearch';
import { createContext, useState } from 'react';
import PluginPage from './pages/PluginPage';
import SettingsPage from './pages/SettingsPage';
import { UserLatestMessagesProvider } from './context/UserLatestMessagesContext';
import { UserMessagesProvider } from './context/UserMessagesContext';
import RequestFromMeList from './components/RequestFromMeList';
import RequestToMeList from './components/RequestToMeList';

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
        element: <ContactPage />,
        children: [
          {
            path: ":friendId",
            element: <FriendInfo />,
          },
          {
            path: "searchFriend",
            element: <FriendSearch />,
          },
          {
            path: "requestFromMe",
            element: <RequestFromMeList />,
          },
          {
            path: "requestToMe",
            element: <RequestToMeList />,
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
      <UserContactProvider>
        <UserLatestMessagesProvider>
          <UserMessagesProvider>
            <UserWsProvider>
              <RouterProvider router={router} />
            </UserWsProvider>
          </UserMessagesProvider>
        </UserLatestMessagesProvider>
      </UserContactProvider>
    </UserInfoProvider>
  );
}

export default App;
