import  Axios  from 'axios';
import React,{useEffect, useState, useContext} from 'react'
import { format } from 'date-fns'
import { AuthContext } from '../../src/security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowAlt } from "react-icons/bi";

export default function AppointmentDetails() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [appointment, setAppointment] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredAppointments, setFilteredAppointments] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState("");
	const [doctors, setDoctors] = useState([]);


    useEffect(()=>{
        async function fetchdata() {
			if (user) {
                const response= await Axios.get('http://localhost:3001/appotable');
                setAppointment(response.data);
				setFilteredAppointments(response.data);
            }
        }
        fetchdata();
    },[user])

	useEffect(() => {
		async function fetchDoctors() {
		  const response = await Axios.get("http://localhost:3001/docdetailstable");
		  setDoctors(response.data);
		}
		fetchDoctors();
	  }, []);
   
	const handlelog = () => {
		navigate('/')
	   };
	
	   const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleDoctorFilter = (event) => {
		setSelectedDoctor(event.target.value);
	};

	useEffect(() => {
		const filtered = appointment.filter((row) => {
			return (
				row.fname.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(!selectedDoctor || row.doctor === selectedDoctor)
			);
		});
		setFilteredAppointments(filtered);
	}, [appointment, searchTerm, selectedDoctor]); 

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
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Appoiments Details</strong>
	
			<div className="flex justify-between items-center mt-3 mb-3 ml-2">
					<div className="w-[400px]">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="search">
							Search by name:
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="search"
							type="text"
							placeholder="Enter name"
							value={searchTerm}
							onChange={handleSearch}
						/>
					</div>
					<div className="w-[400px] mb-3 mr-2">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doctor-filter">
							Filter by doctor:
						</label>
						<select
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="doctor-filter"
							value={selectedDoctor}
							onChange={handleDoctorFilter}
						>
							<option value="">All doctors</option>
							{ doctors.map((doctor) => (
								<option key={doctor.docid} value={doctor.docid}>{doctor.fullname}</option>
						))}
						</select>
					</div>
				</div>
				<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>ID no</th>
							<th>Email</th>
							<th>Mobile</th>
							<th>Appointmant date</th>
                            <th>Doctor</th>
                            <th>Channel no</th>
						</tr>
					</thead>
					
					<tbody>
						{filteredAppointments.map((row) => (
							<tr key={row.appoid}>
								<td>
									{row.appoid}
								</td>
								<td>
									{row.fname}
								</td>
								<td>{row.idno}</td>
								<td>{row.email}</td>
								<td>{row.moblie}</td>
								<td>{format(new Date(row.appodate), 'dd MMM yyyy')}</td>
								<td>{row.doctor}</td>
								<td>{row.chanel}</td>
								
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
}