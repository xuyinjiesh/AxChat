import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Register/>}></Route>
        <Route path="/login" element={ <Login/>}></Route>
        <Route index element={ <Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
