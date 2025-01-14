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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<UserDetails[]>([
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
  const [editingUser, setEditingUser] = useState<UserDetails | null>(null);
  const { toast } = useToast();

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleEditUser = (user: UserDetails) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      toast({
        title: "User Updated",
        description: "User details have been successfully updated.",
      });
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      if (selectedUserId === userId) {
        setSelectedUserId(null);
      }
      toast({
        title: "User Deleted",
        description: "User has been successfully removed.",
      });
    }
  };

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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      {editingUser && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({
                                ...editingUser,
                                name: e.target.value
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({
                                ...editingUser,
                                email: e.target.value
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="role">Role</Label>
                            <Input
                              id="role"
                              value={editingUser.role}
                              onChange={(e) => setEditingUser({
                                ...editingUser,
                                role: e.target.value
                              })}
                            />
                          </div>
                          <Button onClick={handleSaveEdit}>Save Changes</Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
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
