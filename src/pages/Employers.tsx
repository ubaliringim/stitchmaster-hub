import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
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

const fetchEmployers = async () => {
  const response = await fetch('http://localhost:5000/api/employers');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

const Employers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const { data: employers = [], isLoading } = useQuery({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
  });

  const filteredEmployers = employers.filter(employer =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            />
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Employer
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployers.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell>{employer.name}</TableCell>
              <TableCell>{employer.email}</TableCell>
              <TableCell>{employer.role}</TableCell>
              <TableCell>{employer.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employers;