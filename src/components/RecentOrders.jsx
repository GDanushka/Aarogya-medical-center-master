import  Axios  from 'axios';
import React,{useEffect, useState} from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function RecentOrders() {

	const [recentappo, setRecentAppo] = useState([]);

    useEffect(()=>{
        async function fetchdata() {
            const response= await Axios.get('http://localhost:3001/recentappotable');
            setRecentAppo(response.data);
        }
        fetchdata();
    },[])


	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Recent Appoiments</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Date</th>
							<th>Address</th>
							<th>Mobile</th>
                            <th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{recentappo.map((order) => (
							<tr key={order.appoid}>
								<td>
									<Link >{order.appoid}</Link>
								</td>
								<td>
									<Link>{order.fname}</Link>
								</td>
								<td>{format(new Date(order.appodate), 'dd MMM yyyy')}</td>
								<td>{order.address}</td>
								<td>{order.moblie}</td>
								<td>{order.amount}</td>
								
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}