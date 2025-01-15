import { useQuery } from '@tanstack/react-query';
import { UserDetails } from '@/types/user';
import { useState } from 'react';
import { Printer, Search } from 'lucide-react';
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

const fetchEmployers = async (): Promise<UserDetails[]> => {
  const response = await fetch('http://localhost:5000/api/employers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Employers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const { data: employers, isLoading, error } = useQuery({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
  });

  const filteredEmployers = employers?.filter(employer =>
    employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = (employer: UserDetails) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Error",
        description: "Please allow pop-ups to print statements",
        variant: "destructive",
      });
      return;
    }

    // Generate the print content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Daily Statement - ${employer.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin-bottom: 20px; }
            .table { width: 100%; border-collapse: collapse; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .footer { margin-top: 30px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Daily Statement</h1>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="details">
            <h2>Employer Details</h2>
            <p>Name: ${employer.name}</p>
            <p>Email: ${employer.email}</p>
            <p>Role: ${employer.role}</p>
            <p>Status: ${employer.status}</p>
          </div>
          <div class="financial">
            <h2>Financial Details</h2>
            <table class="table">
              <tr>
                <th>Daily Collection</th>
                <td>${employer.dailyCollection}</td>
              </tr>
              <tr>
                <th>Daily Returning</th>
                <td>${employer.dailyReturning}</td>
              </tr>
              <tr>
                <th>Total Target</th>
                <td>${employer.totalTarget}</td>
              </tr>
              <tr>
                <th>Total Due</th>
                <td>${employer.totalDue}</td>
              </tr>
              <tr>
                <th>Amount to Pay</th>
                <td>${employer.amountToPay}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error loading employers</div>;

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
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Daily Collection</TableHead>
            <TableHead>Daily Returning</TableHead>
            <TableHead>Total Target</TableHead>
            <TableHead>Total Due</TableHead>
            <TableHead>Amount to Pay</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployers?.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell>{employer.name}</TableCell>
              <TableCell>{employer.role}</TableCell>
              <TableCell>{employer.email}</TableCell>
              <TableCell>{employer.status}</TableCell>
              <TableCell>{employer.dailyCollection}</TableCell>
              <TableCell>{employer.dailyReturning}</TableCell>
              <TableCell>{employer.totalTarget}</TableCell>
              <TableCell>{employer.totalDue}</TableCell>
              <TableCell>{employer.amountToPay}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePrint(employer)}
                  title="Print Statement"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employers;