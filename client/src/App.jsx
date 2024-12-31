import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Profile from './pages/profile';
import About from './pages/About';
import Header from './components/Header';
import CreateStocking from './pages/createStocking';
import PrivateRoute from './components/PrivateRoute.jsx'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about"element={<About/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-Stocking" element={<CreateStocking />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}