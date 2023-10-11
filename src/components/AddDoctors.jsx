import React,{useState, useContext} from 'react'
import Axios from 'axios'
import { AuthContext } from '../../src/security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiRightArrowAlt } from "react-icons/bi";
import {Footer} from './Footer'

export default function AddDoctors() {
  const [id, setid] = useState('Doc-');
  const [fname, setfname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [dob, setdob] = useState('');
  const [gender, setgender] = useState('');
  const [fees, setfees] = useState(`Rs-`);
  const [joindate, setjoindate] = useState('');
  const [docregister, setDocRegister] = useState('');
  const [specialization, setspecialization] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


    const doctorregister= async (e)=> {
      e.preventDefault();
      if (!fname || !email || !mobile || !dob || !gender || !joindate || !specialization) {
        toast.warn("Please fill in all required fields.", { autoClose: 2000 ,theme:"colored"});
        return;
      }
      await Axios.post('http://localhost:3001/docregister',{
          id:id,
          fname:fname,
          email:email,
          mobile:mobile,
          dob:dob,
          gender:gender,
          fees:fees,
          joindate:joindate,
          specialization:specialization
      }).then((response)=>{
          if(response.data.message){
              setDocRegister(response.data.message);
              toast.success("Doctor Added Successfully", {autoClose: 2000})
          }else if(response.data !== undefined && response.data.message !== undefined){
            
              toast.error("Doctor not Added!", {autoClose: 2000})
          }
      })
      setTimeout(() => {
				window.location.reload();
			  }, 2000);
    }

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
    }else if(user !== 'admin'){
      return (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'250px', fontSize: '1.2rem' }}>
            <div className="loderarea">
                <p className="bg-transparent text-red-500">Unauthorized Access</p></div>
            </div>
            
                </>
        );
    } {  
  return (
    <div className="container">
       <form action="" method='POST'>
      <h1 className="pl-4 text-2xl font-bold">ADD Doctor</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="apoid" className='block mb-2 text-sm font-medium'>
            Doctor ID
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md">
              DR-
            </span>
            <input type='text' className="flex-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-r-md focus:ring-primary-500 focus:border-primary-500" id="id" placeholder='id' onChange={(e) => { setid(e.target.value) }} />
          </div>
        </div>
        <div>
          <label htmlFor="fullname" className='block mb-2 text-sm font-medium'>
            Full Name
          </label>
          <input type="text" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="fullname" placeholder="Full Name" onChange={(e) => { setfname(e.target.value) }} required />
          
        </div>
        <div>
          <label htmlFor="email" className='block mb-2 text-sm font-medium'>
            Email
          </label>
          <input type="email" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="email" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} required />
       
        </div>
        <div>
          <label htmlFor="mobile" className='block mb-2 text-sm font-medium'>
            phone no
          </label>
          <input type="text" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="mobile" placeholder="Mobile*" onChange={(e) => { setmobile(e.target.value) }} required />
        </div>
        <div>
          <label htmlFor="mobile" className='block mb-2 text-sm font-medium'>
            birth day
          </label>
          <input type="date" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="date" placeholder=" birth day" onChange={(e) => { setdob(e.target.value) }} required />
        </div>
        <div>
          <label htmlFor="mobile" className='block mb-2 text-sm font-medium'>
            gender
          </label>
          <select className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="gender" onChange={(e) => { setgender(e.target.value) }}>
          <option value="">Gender*</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
          </select>
          </div>
          <div className="block mb-2 text-sm font-medium">
                <label>Fees</label>
                <input
                  type="text"
                  id="idno"
                  placeholder="Fees"
                  onChange={(e)=>{setfees(e.target.value)}}
                  required
                  className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
          <label htmlFor="mobile" className='block mb-2 text-sm font-medium'>
            Join Date
          </label>
          <input type="date" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="date" placeholder="join date" onChange={(e)=>{setjoindate(e.target.value)}} required />
        </div>
            <div>
          <label htmlFor="fullname" className='block mb-2 text-sm font-medium'>
          Specialization
          </label>
          <input type="text" className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" id="fullname" placeholder="Specialization" onChange={(e)=>{setspecialization(e.target.value)}} required />
        </div> 
        </div>
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3" onClick={doctorregister}>
              Submit
            </button>
            <button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
          </form>
    </div>
  )
}
}
