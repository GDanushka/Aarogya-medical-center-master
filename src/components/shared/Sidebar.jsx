import React from "react";
import { FaClinicMedical } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { DASHBOARD_SIDEBAR_LINKS } from "../../lib/const/navigation";
// import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../../lib/const/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import {AuthContext} from "../../security/AuthProvider"
import { useContext } from "react";
import { toast } from 'react-toastify';

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
  // function handleLogout() {
  //   // Remove the isLoggedIn flag from local storage
  //   localStorage.removeItem("isLoggedIn");
  
  //   // Redirect the user to the login page
  //   window.location.href = "/";
  // }


export default function Sidebar() {
  const {logout}=useContext(AuthContext);
  const { user } = useContext(AuthContext);
  function handlLogout() {
    logout();
toast.success('Logout Successfull', {autoClose: 2000})
    return null;
  }
 
  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.2rem' }}>
        <div className="loderarea">
         </div>
            {/* {window.location.href = "/"}; */}
        </div>
    );
  }else { 
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FaClinicMedical fontSize={24} />
        <span className="text-neutral-100 text-lg">Arogya System</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <div>
            <SideBarLink key={item.key} item={item} />
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SideBarLink key={item.key} item={item} />
        ))}
      </div> */}
      <div className={classNames(linkClass, "cursor-pointer text-red-500 border-t border-neutral-700") } onClick={handlLogout}>
        <span className="text-xl">
          <HiOutlineLogout />
        </span>
        Logout
      </div>
    </div>
  );
}
}

function SideBarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
