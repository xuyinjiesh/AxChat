import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Root from './pages/Root';
import ChatPage, { loader as chatLoader } from './pages/ChatPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ChatRoom from './components/ChatRoom';

const router = createBrowserRouter([
  {
    path: "/Register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "chat",
        element: <ChatPage />,
        loader: chatLoader,
        children: [
          {
            path: ":friend-name",
            element: <ChatRoom />,
            
          }
        ]
      }
    ]
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
