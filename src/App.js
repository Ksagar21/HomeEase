import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Pages/LoginPage/LoginPage"
import {Routes , Route} from "react-router-dom"
import RegistrationForm from './Pages/RegistrationForm/RegistrationForm';
import ServiceForm from './Pages/ServiceForm/ServiceForm';
import Homepage from './Pages/HomePage/HomePage';
import Home from './Pages/HomePage/HomePageold'
import SignUp from './Pages/Signup/Signup';

function App() {
  
  return (
   <>
   <Routes>
   <Route path="/" element={<LoginPage/>} />
   <Route path="/login" element={<LoginPage/>} />
   <Route path="/signup" element={<SignUp/>} />
   <Route path='home' element={<Home/>} />
   <Route path="homeold" element={<Homepage/>}/>
   <Route path="/registerSP" element={<RegistrationForm/>} />
   <Route path="/serviceForm" element={<ServiceForm/>} />
   </Routes>
   </>
  );
}

export default App;
