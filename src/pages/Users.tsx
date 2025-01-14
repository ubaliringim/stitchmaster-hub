import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import UserDashboard from "@/components/UserDashboard";
import { UserDetails } from "@/types/user";

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users] = useState<UserDetails[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      email: "john@example.com",
      status: "Active",
      dailyDate: "2024-03-20",
      dailyCollection: 1500,
      dailyReturning: 1000,
      totalTarget: 5000,
      totalDue: 2000,
      amountToPay: 50,
      bankDetails: {
        accountName: "John Doe",
        accountNumber: "1234567890",
        bankName: "Example Bank",
      },
      payeeName: "John Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Manager",
      email: "jane@example.com",
      status: "Active",
      dailyDate: "2024-03-20",
      dailyCollection: 2000,
      dailyReturning: 1500,
      totalTarget: 6000,
      totalDue: 2500,
      amountToPay: 60,
      bankDetails: {
        accountName: "Jane Smith",
        accountNumber: "0987654321",
        bankName: "Sample Bank",
      },
      payeeName: "Jane Smith",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Employee",
      email: "bob@example.com",
      status: "Inactive",
      dailyDate: "2024-03-20",
      dailyCollection: 1000,
      dailyReturning: 500,
      totalTarget: 3000,
      totalDue: 1000,
      amountToPay: 40,
      bankDetails: {
        accountName: "Bob Johnson",
        accountNumber: "1122334455",
        bankName: "Bank of Example",
      },
      payeeName: "Bob Johnson",
    },
  ]);

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id}
                className="cursor-pointer"
                onClick={() => setSelectedUserId(user.id)}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality here
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality here
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedUser && (
        <UserDashboard user={selectedUser} />
      )}
    </div>
  );
};

export default Users;
