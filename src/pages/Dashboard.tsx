import { Card } from "@/components/ui/card";
import { Users, Package, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  console.log("Dashboard component rendered"); // Debug log

  // Mock data for preview
  const [stats] = useState([
    { title: "Total Employers", value: "150", icon: Users, trend: "+12%" },
    { title: "Inventory Items", value: "1,234", icon: Package, trend: "+3%" },
    { title: "Pending Tasks", value: "25", icon: Clock, trend: "-5%" },
    { title: "Total Revenue", value: "$45,231", icon: DollarSign, trend: "+8%" },
  ]);

  // Handle employer click
  const handleEmployerClick = (employerId: string) => {
    console.log("Navigating to employer:", employerId);
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
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" 
            onClick={() => handleEmployerClick("123")}
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
              className="flex items-center space-x-4 py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => navigate('/employers')}
            >
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New Employers Status</p>
                <p className="text-sm text-gray-500">View all Employers</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
          <div className="space-y-4">
            {[
              { name: "Cotton Fabric", total: 234, collected: 180, remaining: 54 },
              { name: "Silk Material", total: 156, collected: 120, remaining: 36 },
              { name: "Wool Blend", total: 89, collected: 45, remaining: 44 }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Total: {item.total} units</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-green-600">Collected: {item.collected}</span>
                      <span className="text-xs text-orange-600">Remaining: {item.remaining}</span>
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