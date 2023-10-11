import React ,{useContext}from 'react'
import Dashbordstat from './Dashbordstat'
import TransactionChart from './TransactionChart'
// import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrders from './RecentOrders'
import DoctorStats from './DoctorStats'
import { AuthContext } from '../../src/security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowAlt } from "react-icons/bi";
import { Footer } from './Footer'

export default function Dashbord() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <div className='flex flex-col gap-4'>
        <Dashbordstat/> 
        <div className="flex flex-row gap-4">
          <TransactionChart />
          {/* <BuyerProfilePieChart /> */}
        </div>
        <div className="flex flex-row gap-4">
          <RecentOrders />
          <DoctorStats/>
        </div>
        <Footer/>
      </div>
    )
}
}