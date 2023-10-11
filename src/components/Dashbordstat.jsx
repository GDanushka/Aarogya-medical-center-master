import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPeople, IoCart } from 'react-icons/io5'

export default function DashboardStat() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/chart1")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCard(data);
        } else if (data.error) {
          console.log(data.error);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {card.map((row) => (
        <div className='flex gap-4 w-full 'key={row.appoid} >
          <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center" >
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
              <IoBagHandle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Appointments (Monthly)</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{row.patient}</strong>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center" >
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
              <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Today Patients</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{row.numPatients}</strong>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center" >
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <IoCart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">Earnings (monthly)</span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{`Rs.${row.amount}`}</strong>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
