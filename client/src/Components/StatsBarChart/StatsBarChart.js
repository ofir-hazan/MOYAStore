import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function StatsBarChart() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3001/orders/getQuantities")
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
        })
        .catch((err) => console.log(err));
    }, []);
    
    return (
        <BarChart
          width={500}
          height={300}
          data={stats}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#6cbaa9" />
        </BarChart>
    )
}

export default StatsBarChart;

