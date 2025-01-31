import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import ChatWithUs from './pages/ChatWithUs';
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat-with-us" element={<ChatWithUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
