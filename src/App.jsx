import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Character from './pages/Character/Character';
import Locations from './pages/Locations/Locations';
import Episode from './pages/Episodes/Episode';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/location/:id" element={<Locations />} />
          <Route path="/episode/:id" element={<Episode />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
