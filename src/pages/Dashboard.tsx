import { Card } from "@/components/ui/card";
import { Users, Package, Clock, DollarSign } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }: { title: string; value: string; icon: any; trend: string }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm mt-2 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend} from last month
        </p>
      </div>
      <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, trend: "+5.25%" },
    { title: "Inventory Items", value: "856", icon: Package, trend: "-2.65%" },
    { title: "Pending Tasks", value: "43", icon: Clock, trend: "+12.5%" },
    { title: "Total Revenue", value: "$12,435", icon: DollarSign, trend: "+8.15%" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 py-3 border-b last:border-0">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
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
                    <p className="text-sm text-gray-500">Stock: 234 units</p>
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