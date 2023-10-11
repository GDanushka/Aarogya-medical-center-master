import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashbord";
import Appointment from "./components/Appoiment";
import AppointmentDetails from "./components/AppoimentDetails";
import AddDoctors from "./components/AddDoctors";
import DoctorDetails from "./components/DoctorDetails";
import Login from "./components/Login";
import {AuthProvider} from '../src/security/AuthProvider'
import Payment from "./components/Payment";
import Invoice from "./components/invoice/Invoice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddReport from "./components/AddReport";
import Labreport from "./components/Labreport";

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layout" element={<Layout />}>
          <Route path="dashbord" element={<Dashboard />} />
          <Route path="appoiment" element={<Appointment />} />
          <Route path="appoimentdetails" element={<AppointmentDetails />} />
          <Route path="adddoctors" element={<AddDoctors />} />
          <Route path="doctordetails" element={<DoctorDetails /> }/>
          <Route path="addlab" element={<AddReport /> }/>
          <Route path="labreporttable" element={<Labreport /> }/>
          <Route path="payment" element={<Payment />} />
          <Route path="invoice" element={<Invoice />} />
       </Route>
      </Routes>
      </AuthProvider>
    </Router>
   </>
  );
}

export default App;
