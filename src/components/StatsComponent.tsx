import { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; // Import the Users icon
import axios from 'axios'; // For making HTTP requests

const StatsComponent = () => {
  const [stats, setStats] = useState([
    { title: "Total Users", value: "Loading...", icon: Users, trend: "0%" },
  ]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost/getTotalUsers.php');
        const data = response.data;
        setStats(prevStats => [
          { ...prevStats[0], value: data.totalUsers.toString(), trend: data.trend },
          ...prevStats.slice(1)
        ]);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <stat.icon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            <span className={stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {stat.trend}
            </span>{' '}
            from last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsComponent;