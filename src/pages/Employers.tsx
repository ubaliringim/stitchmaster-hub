import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const fetchEmployers = async () => {
  const response = await fetch('http://localhost/api.php');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

const deleteEmployer = async (id: string) => {
  const response = await fetch(`http://localhost/deleteEmployer.php?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete employer');
  return response.json();
};

const addEmployer = async (newEmployer: any) => {
  const response = await fetch('http://localhost/addEmployer.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEmployer),
  });
  if (!response.ok) throw new Error('Failed to add employer');
  return response.json();
};

const Employers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployer, setNewEmployer] = useState({
    name: '',
    phone: '',
    role: '',
    status: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch employers
  const { data: employers = [], isLoading } = useQuery({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
  });

  // Delete employer mutation
  const deleteMutation = useMutation({
    mutationFn: deleteEmployer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      toast({
        title: "Employer Deleted",
        description: "The employer has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the employer.",
        variant: "destructive",
      });
    },
  });

  // Add employer mutation
  const addMutation = useMutation({
    mutationFn: addEmployer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      toast({
        title: "Employer Added",
        description: "The employer has been successfully added.",
      });
      setIsAddDialogOpen(false);
      setNewEmployer({ name: '', phone: '', role: '', status: '' });
      navigate(`/employer/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add the employer.",
        variant: "destructive",
      });
    },
  });

  const filteredEmployers = employers.filter(employer =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this employer?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployer = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(newEmployer);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Employer
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployers.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell>{employer.id}</TableCell>
              <TableCell>{employer.name}</TableCell>
              <TableCell>{employer.phone}</TableCell>
              <TableCell>{employer.role}</TableCell>
              <TableCell>{employer.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Pencil
                    className="h-4 w-4 text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => navigate(`/employer/${employer.id}`)}
                  />
                  <Trash2
                    className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(employer.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Employer</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new employer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddEmployer} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={newEmployer.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={newEmployer.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              name="role"
              placeholder="Role"
              value={newEmployer.role}
              onChange={handleInputChange}
              required
            />
            <Input
              name="status"
              placeholder="Status"
              value={newEmployer.status}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" className="w-full">
              Add Employer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employers;