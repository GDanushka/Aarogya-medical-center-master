import React, { useEffect, useState,useRef,useContext } from 'react'
import { format } from "date-fns";
import Axios from "axios";
import { AuthContext } from "../../src/security/AuthProvider";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

const Labreport = () => {
const [lab,setLab] = useState([]);
const { user } = useContext(AuthContext);
const navigate = useNavigate();


useEffect(() => {
  fetchdata();
}, []);
  const fetchdata = async () => {
    const response = await Axios.get("http://localhost:3001/labreport");
    setLab(response.data);
  }

  const handlelog = () => {
    navigate('/')
     };



  if (!user) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "250px",
            fontSize: "1.2rem",
          }}
        >
          <div className="loderarea">
            <p className="Hedding">You must be logged in to view this page.</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            className="bg-cyan-900 w-[200px] h-[35px] text-white rounded-md font-semibold flex justify-center items-center text-center"
            onClick={handlelog}
          >
            <p>Goto Login Page</p>
            <div className="text-3xl mt-1">
              <BiRightArrowAlt />
            </div>
          </button>
        </div>
      </>
    );
  } else {
  return (
    <>
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
    <strong className="text-gray-700 font-medium uppercase">LAB Report </strong>
    <div className="border-x border-gray-200 rounded-sm mt-3">
      <table className="w-full text-gray-700">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Issue date</th>
            <th>Blood Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
         {lab.map((row) =>(
            <tr key={row.Patient_ID}>
              <td>{row.Patient_ID}</td>
              <td>{row.Full_name}</td>
              <td>{row.Age}</td>
              <td>{format(new Date(row.Issue_date), "dd MMM yyyy")}</td>
              <td>{row.Blood_type}</td>
              <td>{row.Result>= 115 ?(
                 <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-red-600">
                 {row.Result}
               </span>
              ):row.Result <=75 ?(
                <span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-yellow-200">
                          {row.Result}
                        </span>
               ): (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-white bg-sky-400">
                          {row.Result}
                        </span>
              )}</td>
            
            </tr>
         ))}
          </tbody>
      </table>
    </div>
  </div>
  </>
  )
 }
}

export default Labreport
