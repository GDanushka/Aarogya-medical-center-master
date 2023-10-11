import Axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { format } from 'date-fns'
import { AuthContext } from '../../src/security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowAlt } from "react-icons/bi";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const response = await Axios.get("http://localhost:3001/payment");
      setPayment(response.data);
    }
    fetchdata();
  }, []);

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
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">Payment</strong>
        <div className="border-x border-gray-200 rounded-sm mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor Name</th>
                <th>Doctor Fees</th>
                <th>No of Appointment</th>
                <th>Total Earning</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((row) => (
                <tr key={row.docname}>
                  <td>{format(new Date(row.date), "dd MMM yyyy")}</td>
                  <td>{row.docname}</td>
                  <td>{row.amount}</td>
                  <td>{row.nopatient}</td>
                  <td>{row.totamount}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
}

export default Payment;
