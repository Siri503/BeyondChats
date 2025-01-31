import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import ChatWithUs from './pages/ChatWithUs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat-with-us" element={<ChatWithUs />} />
      </Routes>
    </BrowserRouter>
  );
}
