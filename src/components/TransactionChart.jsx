import React, { useEffect, useState, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


export default function TransactionChart() {
	const [earnings, setEarnings] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3001/chart")
		  .then((response) => response.json())
		  .then((data) => {
			if (Array.isArray(data)) {
			  setEarnings(data);
			} else if (data.error) {
			  console.log(data.error);
			}
		  })
		  .catch((error) => console.log(error));
	  }, []);

	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				{Array.isArray(earnings)&& earnings.length > 0 ?(
					<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={earnings}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						{Object.keys(earnings[0] || {})
                          .filter(
                            (key) => key !== "month" && key !== "CenterEarnings"
                          )
                          .map((doctor) => (
                            <Bar
                              key={doctor}
                              dataKey="DoctorEarnings"
                              fill="#3c32f6"
                            />
                          ))}
						<Bar dataKey="CenterEarnings" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
				):(
					<p>No Data</p>
				)}
				
			</div>
		</div>
	)
}