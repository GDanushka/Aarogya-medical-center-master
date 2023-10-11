import classNames from "classnames";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function PopularProducts() {
  const [docdetails, setdocdetails] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const response = await Axios.get("http://localhost:3001/docdetailstable");
      setdocdetails(response.data);
    }
    fetchdata();
  }, []);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Doctors Stat</strong>
      <div className="mt-4 flex flex-col gap-3">
        {docdetails.map((row) => (
          <div
            key={row.id}
            className="flex items-start hover:no-underline"
          >
           
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{row.fullname}</p>
              <span className={classNames("text-xs font-medium")}>
                {row.specialization}
              </span>
            </div>
            <div
              className={classNames(
                "text-xs text-gray-400 pl-1.5",
                row.status === "Available" && "text-green-400",
                row.status === "Absend" && "text-red-400"
              )}
            >
              {row.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
