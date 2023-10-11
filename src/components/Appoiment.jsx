import React, { useState, useEffect,useContext } from "react";
import Axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Invoice from "./invoice/Invoice"
import { AuthContext } from '../../src/security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiRightArrowAlt } from "react-icons/bi";

const Appoiment = () => {

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  // use the formatted date as the initial value for joindate state


  const [id, setid] = useState("APPT-" + generateUniqueId());
  const [fname, setfname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [idno, setidno] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [apodate, setapodate] = useState("");
  const [apodoc, setapodoc] = useState("");
  const [todaydate, settodaydate] = useState(formattedDate);
  const [selectedDoctorFee, setselectedDoctorFee] = useState("");
  const [apporegister, setAppointmentRegister] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [appointmentNo, setappointmentNo] = useState("");
  const [open, setopen] = useState(false);
  const [invoiceno,setInvoiceno]=useState(generateInvoiceNumber())
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  //...............invoice...........

  function generateInvoiceNumber () {
    const prefix = "INV";
    const uniqueId = Date.now().toString(5) + Math.random().toString(5).substr(2, 3);
    const invoiceNumber = `${prefix}-${uniqueId}`;
    return invoiceNumber.substr(0, 8);
  };

  const invoicedata={
    Doctorname:selectedDoctorName,
    fullname:fname,
    Appointmantno:appointmentNo,
    AppointmentDate:apodate,
    Doctorfee:selectedDoctorFee,
    Gender:gender,
    Address:address,
    Email:email,
    Mobile:mobile,
    invoiceNumber:invoiceno
  }

  const asf = (event) => {
   setInvoiceno (event.target.value);
  };

 
  

  const appointmentregister= async (e)=> {
    e.preventDefault();
    if (!fname || !email || !mobile || !idno || !address||!gender||!apodate||!apodoc) {
      toast.error("Please fill in all required fields.", { autoClose: 2000 });
      return;
    }
    await Axios.post('http://localhost:3001/apporegister',{
        id:id,
        fname:fname,
        email:email,
        mobile:mobile,
        idno:idno,
        address:address,
        gender:gender, 
        apodate:apodate,
        apodoc:apodoc,
        todaydate:todaydate,
        selectedDoctorFee:selectedDoctorFee,
        appointmentNo:appointmentNo,
    }).then((response)=>{
        if(response.data.message){
            setAppointmentRegister(response.data.message);
            toast.success('Appointment registered successfully!',{ autoClose: 3000 });
            handlclickopen();
        }else{
            setAppointmentRegister(response.data[0].message);
           toast.error('Appointment not registered!',{ autoClose: 3000 });
           
        }
        
    })
    //
  }
    

  useEffect(() => {
    // Fetch data from the backend
    Axios.get("http://localhost:3001/doctable")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //*************event********************

  function handleInputChange(event) {
    appodocdropdown(event);
    handleDoctorChange(event);
    handlenexchannel(event);
  }

  const appodocdropdown = (event) => {
    setapodoc(event.target.value);
  };

  async function handleDoctorChange(event) {
    const doctorId = await event.target.value;
    const selectedDoctor = doctors.find((doctor) => doctor.docid === doctorId);
    setSelectedDoctorId(doctorId);
    setSelectedDoctorName(selectedDoctor.fullname);
    setselectedDoctorFee(selectedDoctor.fees);
  }

  function handlenexchannel(event) {
    const doctorId = event.target.value;
    fetch(`http://localhost:3001/doctors/${doctorId}/next`)
      .then((response) => response.text())
      .then((data) => setappointmentNo(data))
      .catch((error) => console.error(error));
  }

  const closebtn = () => {
    window.location.reload();
  };

  const handlclickopen = () => {
	  setopen(true);
	};
  const handleClose = () => {
	  setopen(false);
    window.location.reload();
	};

  const handlelog = () => {
    navigate('/')
   };
  
  if (!user) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'250px', fontSize: '1.2rem' }}>
          <div className="loderarea">
              <p className="Hedding">You must be logged in to view this page.</p></div>
          </div>
          <div className='flex items-center justify-center mt-2'>
          <button className="bg-cyan-900 w-[200px] h-[35px] text-white rounded-md font-semibold flex justify-center items-center text-center" onClick={handlelog}>
            <p>Goto Login Page</p>
          <div className='text-3xl mt-1'>
          <BiRightArrowAlt/>
          </div>
         </button>
          </div>
              </>
    );
  }else {
  return (
    <>
    <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{ style: { width: '800px', maxWidth: '90%', height: "900px" } }}
                >
                  <DialogTitle>Invoice</DialogTitle>
                  <DialogContent>
                    <Invoice data={invoicedata} id="invoice" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{ color: "red" }}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

      <div>
        <form action="" method="POST">
          <div className="flex flex-row w-full gap-3">
            <div className="left-side w-full">
              <div className="flex flex-col">
                <label>Appointment ID :</label>
                <input
                  disabled
                  type="text"
                  id="id"
                  placeholder={id}
                  value={id}
                  onChange={(e) => {
                    setid(e.target.value);
                  }}
                  className="bg-slate-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Full Name</label>
                <input
                  type="text"
                  id="fistName"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setfname(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Phone No</label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="Mobile No"
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>ID No</label>
                <input
                  type="text"
                  id="idno"
                  placeholder="Id No"
                  onChange={(e) => {
                    setidno(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Adderess</label>
                <input
                  id="address"
                  placeholder="Address"
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
            </div>
            <div className="right-side w-full gap-3">
              <div className="flex flex-col">
                <label>Gender</label>
                <select
                  onChange={(e) => {
                    setgender(e.target.value);
                  }}
                  className="bg-slate-200 outline-none p-2 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col mt-2">
                <label>Appointment Date</label>
                <input
                  type="date"
                  id="apodate"
                  placeholder="Appointment date"
                  onChange={(e) => {
                    setapodate(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label>Appointment Doctor</label>
                <select
                  value={selectedDoctorId}
                  onChange={handleInputChange}
                  className="bg-slate-200 outline-none p-2 rounded-md"
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.docid} value={doctor.docid}>
                      {doctor.fullname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mt-2">
                <label>Today Date</label>
                <input
                  type="date"
                  id="date"
                  value={todaydate}
                  placeholder={todaydate}
                  onChange={(e) => {
                    settodaydate(e.target.value);
                  }}
                  required
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div key="{item.docid}" className="flex flex-col mt-2">
                <label>Amount</label>
                <input
                  disabled
                  type="text"
                  onChange={handleDoctorChange}
                  value={selectedDoctorFee}
                  placeholder={selectedDoctorFee}
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Channel No</label>
                <input
                  disabled
                  type="text"
                  id="id"
                  placeholder={appointmentNo}
                  value={appointmentNo}
                  onChange={(e) => {
                    setappointmentNo(e.target.value);
                  }}
                  className="bg-slate-200 outline-none p-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3"  onClick={appointmentregister}>
              Submit
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closebtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
}

export default Appoiment;

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  const uniqueId = `${timestamp}${randomNum}`.substring(0, 11);
  return uniqueId;
}
