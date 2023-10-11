import Axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/security/AuthProvider";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Report from '../components/report/Report'

const AddReport = () => {
  const navigate = useNavigate();
  const [patient_ID, setpatient] = useState("");
  const [full_name, setfullname] = useState("");
  const [age, setage] = useState("");
  const [specimen, setspecimen] = useState("");
  const [blood_typ, setbloodtype] = useState("");
  const [fess, setfees] = useState("");
  const [issue_date, setissuedate] = useState("");
  const [result, setresult] = useState("");
  const [adder, setadder] = useState("");
  const { user } = useContext(AuthContext);
  const [open, setopen] = useState(false);

  const labreport = async (e) => {




    e.preventDefault();
    if (!full_name ||!age ||!specimen ||!blood_typ ||!fess ||!issue_date ||!result) {
      toast.warn("Please fill in all required fields.", {
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    await Axios.post("http://localhost:3001/labreport", {
      patient_ID: patient_ID,
      full_name: full_name,
      age: age,
      specimen: specimen,
      blood_typ: blood_typ,
      fess: fess,
      issue_date: issue_date,
      result: result,
    }).then((responce) => {
      if (responce.data.success) {
        setadder(responce.data.success);
        toast.success("report successfuly", { autoClose: 3000 });
        handlclickopen();
      } else {
        toast.error("report not Added!", { autoClose: 2000 });
      }
    });
   
  };

  const invoicedata={
    fullname:full_name,
    age:age,
    specimenby:specimen,
    blood:blood_typ,
    fee:fess,
    result:result,
  }

  const handlclickopen = () => {
	  setopen(true);
	};
  const handleClose = () => {
	  setopen(false);
    window.location.reload();
	};

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        <div className="loderarea">
          <p className="Hedding">You must be logged in to view this page.</p>
        </div>
        {navigate("/")};
      </div>
    );
  } else {
    return (
      <>
         <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{ style: { width: '800px', maxWidth: '90%', height: "900px" } }}
                >
                  <DialogContent>
                    <Report data={invoicedata} id="invoice" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{ color: "red" }}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
      <div className="container">
        <form action="" method="POST">
          <h1 className="pl-4 text-2xl font-bold uppercase">
            ADD blood Report
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="apoid" className="block mb-2 text-sm font-medium">
                Patient ID
              </label>
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-r-md focus:ring-primary-500 focus:border-primary-500"
                id="id"
                placeholder="id"
                onChange={(e) => {
                  setpatient(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id="fullname"
                placeholder="Full Name"
                onChange={(e) => {
                  setfullname(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block mb-2 text-sm font-medium">
                Age
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id="Age"
                placeholder="Age"
                onChange={(e) => {
                  setage(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium"
              >
                Specimen By
              </label>
              <select
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id="  Specimen By"
                onChange={(e) => {
                  setspecimen(e.target.value);
                }}
              >
                <option value="">Select*</option>
                <option value="Dasun Priyashan">Dasun Priyashan</option>
                <option value="Dulmini Madushika">Dulmini Madushika</option>
                <option value="Imesh Priyashan">Imesh Priyashan</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium"
              >
                Blood Type
              </label>
              <select
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id=" Blood Type"
                onChange={(e) => {
                  setbloodtype(e.target.value);
                }}
              >
                <option value="">Blood Type*</option>
                <option value="A+">A+</option>
                <option value="A-">
                  A<sup>-</sup>
                </option>
                <option value="B+">
                  B<sup>+</sup>
                </option>
                <option value="B-">
                  B<sup>-</sup>
                </option>
                <option value="AB+">
                  AB<sup>+</sup>
                </option>
                <option value="AB-">
                  AB<sup>-</sup>
                </option>
                <option value="O+">
                  O<sup>+</sup>
                </option>
                <option value="O-">
                  O<sup>-</sup>
                </option>
              </select>
            </div>
            <div className="block mb-2 text-sm font-medium">
              <label>Fees</label>
              <input
                type="text"
                id="Fees"
                placeholder="Fees"
                onChange={(e) => {
                  setfees(e.target.value);
                }}
                required
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium"
              >
                Issue Date
              </label>
              <input
                type="date"
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id="Issue Date"
                placeholder="issue date"
                onChange={(e) => {
                  setissuedate(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium"
              >
                Result
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 mb-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                id="Result"
                placeholder="Result"
                onChange={(e) => {
                  setresult(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3"
              onClick={labreport}
            >
              Submit
            </button>
            <button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
      </>
    );
  }
};

export default AddReport;
