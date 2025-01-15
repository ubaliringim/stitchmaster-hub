import { useQuery } from '@tanstack/react-query';
import { UserDetails } from '@/types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fetchEmployers = async (): Promise<UserDetails[]> => {
  const response = await fetch('http://localhost:5000/api/employers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Employers = () => {
  const { data: employers, isLoading, error } = useQuery({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employers</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employers</h1>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {employers?.map((employer) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employers;