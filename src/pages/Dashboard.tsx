import { Card } from "@/components/ui/card";
import { Users, Package, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  // State to hold the stats data
  const [stats, setStats] = useState([
    { title: "Total Employers", value: "0", icon: Users, trend: "0%" },
    { title: "Inventory Items", value: "0", icon: Package, trend: "0%" },
    { title: "Pending Tasks", value: "0", icon: Clock, trend: "0%" },
    { title: "Total Revenue", value: "$0", icon: DollarSign, trend: "0%" },
  ]);

  // Fetch stats data from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total employers
        const employersResponse = await axios.get('http://localhost/getTotalEmployers.php');
        const employersData = employersResponse.data;
        console.log('Employers Data:', employersData); // Log the data

        // Update the stats array with fetched data
        const updatedStats = [
          { title: "Total Employers", value: employersData.totalEmployers.toString(), icon: Users, trend: employersData.trend },
          { title: "Inventory Items", value: "0", icon: Package, trend: "0%" }, // Placeholder for now
          { title: "Pending Tasks", value: "0", icon: Clock, trend: "0%" }, // Placeholder for now
          { title: "Total Revenue", value: "$0", icon: DollarSign, trend: "0%" }, // Placeholder for now
        ];
        setStats(updatedStats);
        console.log('Updated Stats:', updatedStats); // Log the updated stats
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Handle employer click
  const handleEmployerClick = (employerId: string) => {
    console.log("Navigating to employer:", employerId); // Debugging log
    navigate(`/employer/${employerId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="p-6 cursor-pointer" // Add cursor-pointer to indicate clickable
            onClick={() => handleEmployerClick("123")} // Replace "123" with the actual employer ID
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className={`text-sm mt-2 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend} from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Inventory Status Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div 
              className="flex items-center space-x-4 py-3 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => navigate('/employers')}
            >
              <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Daily Collection Status</p>
                <p className="text-sm text-gray-500">View all collections</p>
              </div>
            </div>
            <div 
              className="flex items-center space-x-4 py-3 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => navigate('/employers')}
            >
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Daily Returning Status</p>
                <p className="text-sm text-gray-500">View all returns</p>
              </div>
            </div>
            <div 
              className="flex items-center space-x-4 py-3 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => navigate('/employers')}
            >
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New Employers Status</p>
                <p className="text-sm text-gray-500">View all Employer</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cotton Fabric</p>
                    <p className="text-sm text-gray-500">Total: 234 units</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-green-600">Collected: 180</span>
                      <span className="text-xs text-orange-600">Remaining: 54</span>
                    </div>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  In Stock
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;