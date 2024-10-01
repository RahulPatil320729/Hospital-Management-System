import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


import NavbarComponent from './Header/NavbarComponent';
import HomePageComponent from './components/HomePageComponent';
import ServiceComponent from './components/ServiceComponent';
import EventComponent from './components/EventComponent';
import LoginComponent from './components/LoginComponent';
import UserRegisterForm from './sublogin/UserRegisterForm';
import DepartmentsComponent from './components/DepartmentsComponent';
import DoctorsComponent from './components/DoctorsComponent';
import FooterComponent from './Footer/FooterComponent';
import DoctorDetail from './subdoctor/DoctorDetail';
import AppointmentComponent from './components/AppointmentComponent';
import DoctorAppointment from './components/DoctorAppointment';
import PrescriptionComponent from './components/PrescriptionsComponent';
import LabTestsComponent from './components/LabTestsComponent ';
import MedicalHistoryComponent from './components/MedicalHistoryComponent';
import InvoiceComponent from './components/InvoiceComponent';
import PatientAllDetails from './components/PatientAllDetails';
import DoctorPagination from './subdoctor/DoctorPagination';
import Cardiology from './subdeparment/Cardiology';
import Dental from './subdeparment/Dental';
import Neurologist from './subdeparment/Neurologist';
import Pediatric from './subdeparment/Pediatric';
import Pulmonary from './subdeparment/Pulmonary';
import Traumatology from './subdeparment/Traumatology';
import Urology from './subdeparment/Urology';
import Xray from './subdeparment/Xray';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route index element={<HomePageComponent/>}/>
        <Route path="/home" element={<HomePageComponent/>}/>
        <Route path="/departments" element={<DepartmentsComponent/>}/>
        <Route path="/departments/cardiology" element={<Cardiology/>}/>
        <Route path="/doctors" element={<DoctorsComponent/>}/>
        <Route path="/doctors/:doctoreId" element={<DoctorDetail/>}/>
        <Route path="/services" element={<ServiceComponent/>}/>
        <Route path="/event" element={<EventComponent/>}/>
        <Route path="/login" element={<LoginComponent/>}/>
        <Route path="/login/register" element={<UserRegisterForm/>}/>
        <Route path="/appointment" element={<AppointmentComponent/>}/>
        <Route path="/doctorappointment" element={<DoctorAppointment/>}/>
        <Route path="/prescription" element={<PrescriptionComponent/>}/>
        <Route path="/labtests" element={<LabTestsComponent/>}/>
        <Route path="/medicalhistory" element={<MedicalHistoryComponent/>}/>
        <Route path="/invoice" element={<InvoiceComponent/>}/>
        <Route path="/patientalldetails" element={<PatientAllDetails/>}/>
        <Route path='/DoctorPagination' element={<DoctorPagination/>}/>
        <Route path='/cardiology' element={<Cardiology/>}/>
        <Route path='/dental' element={<Dental/>}/>
        <Route path='/neurologist' element={<Neurologist/>}/>
        <Route path='/pediatric' element={<Pediatric/>}/>
        <Route path='/pulmonary' element={<Pulmonary/>}/>
        <Route path='/traumatology' element={<Traumatology/>}/>
        <Route path='/urology' element={<Urology/>}/>
        <Route path='xray' element={<Xray/>}/>
      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
