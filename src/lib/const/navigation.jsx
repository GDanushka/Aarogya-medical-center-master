
import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { CiBookmarkPlus } from 'react-icons/ci'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdPayment } from "react-icons/md";
import { TbListDetails,TbReportMedical } from "react-icons/tb";
import { ImLab } from "react-icons/im";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: 'dashbord',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'Appoiment',
		label: 'Add Appoiment',
		path: 'appoiment',
		icon: <HiOutlineCube />
	},
	{
		key: 'AppoimentDetails',
		label: 'Appoiment Details',
		path: 'appoimentdetails',
		icon: <CiBookmarkPlus />
	},
	{
		key: 'Doctors',
		label: 'Add Doctor',
		path: 'adddoctors',
		icon: <BsFillPersonPlusFill />
	},
	{
		key: 'DoctorDetails',
		label: 'Doctor Details',
		path: 'doctordetails',
		icon: <TbListDetails />
	},
	{
		key: 'LabReport',
		label: 'Add Lab Report',
		path: 'addlab',
		icon: <ImLab />
	},
	{
		key: 'LabReporttabel',
		label: 'Lab Reports',
		path: 'labreporttable',
		icon: <TbReportMedical />
	},
	{
		key: 'DoctorDetails',
		label: 'Payment',
		path: 'payment',
		icon: <MdPayment />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support-1',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]