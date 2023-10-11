import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete,AiOutlineWarning } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AuthContext } from "../../src/security/AuthProvider";
import { toast } from "react-toastify";
import { BiRightArrowAlt } from "react-icons/bi";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const initialState = {
  name: "",
  id: "",
  status: "",
  number: "",
  fees: "",
};

export default function DoctorDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [docdetails, setdocdetails] = useState([]);
  const [open, setopen] = useState(false);
  const { user } = useContext(AuthContext);

  //*****************get data************* */
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const response = await Axios.get("http://localhost:3001/docdetailstable");
    setdocdetails(response.data);
  };

  //...............edit................/
  const handleEditClick = async (id) => {
    // Make an API call to update the data in the database
    try {
      const response = await Axios.post(
        `http://localhost:3001/docdetailstable/edit`,
        formData
      );
      console.log(response.data);
      setData([...data, response.data]);
      toast.success("Doctor Updated Successfully", { autoClose: 2000 });
      setFormData(initialState);
      handleClose();
      // If the API call is successful, update the docdetails state with the new data
    } catch (error) {
      console.log(error);
    }
    // Close the edit dialog
    handleClose();
  };
  //*********************************popup******************** */
  const handlclickopen = (row) => {
    setFormData(row);
    setopen(true);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setopen(false);
  };

  //*************delete********* */

  const handldelete = (id) => {
    if (user !== "admin") {
      toast.warn("Unauthorized access", {
        icon: <AiOutlineWarning />,
        theme: "colored",
        autoClose: 2000,
      });
    }else{
    Axios.delete(`http://localhost:3001/doctors/${id}`)
      .then((res) => {
        toast.error("Delete Successfull", {
          icon: <AiOutlineDelete />,
          theme: "colored",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

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
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleEditClick}>
            <DialogTitle>Edit Item Order</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="id"
                name="id"
                label="Doc id"
                type="text"
                value={formData.docid}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="fullname"
                name="fullname"
                label="Full name"
                type="text"
                value={formData.fullname}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="mobile"
                name="mobile"
                label="Mobile"
                value={formData.mobile}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="fees"
                name="fees"
                label="Fees"
                type="number"
                value={formData.fees}
                onChange={handleFormChange}
                fullWidth
              />
              <FormControl margin="dense" fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <MenuItem value="">---</MenuItem>
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Absend">Absend</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Edit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">Doctor Details</strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Dob</th>
                  <th>Join Date</th>
                  <th>Specialization</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {docdetails.map((row) => (
                  <tr key={row.docid}>
                    <td>{row.docid}</td>
                    <td>{row.fullname}</td>
                    <td>
                      {row.gender === "M" ? (
                        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                          {row.gender}
                        </span>
                      ) : (
                        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                          {row.gender}
                        </span>
                      )}
                    </td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{format(new Date(row.dob), "dd MMM yyyy")}</td>
                    <td>{format(new Date(row.joindate), "dd MMM yyyy")}</td>
                    <td>{row.specialization}</td>
                    <td>
                      {row.status == "Available" ? (
                        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
                          {row.status}
                        </span>
                      ) : (
                        <span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-red-100">
                          {row.status}
                        </span>
                      )}
                    </td>

                    <td>

                      <button
                        className="mr-2 text-red-600"
                        onClick={() => handldelete(row.docid)}
                      >
                        <AiOutlineDelete fontSize={18} />
                      </button>
                      <button onClick={() => handlclickopen(row)}>
                        <AiOutlineEdit fontSize={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
