import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetails } from "@/types/user";
import axios from "axios";

const EmployerDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        console.log("Fetching employer details for ID:", id);
        const response = await axios.get(`http://localhost/getEmployerDetails.php?id=${id}`);
        console.log("Received data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching employer details:", error);
        setError("Failed to load employer details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>No employer data found</div>;
  }

  // Safely calculate values with fallbacks
  const totalAmount = (user.totalDue || 0) * (user.amountToPay || 0);
  const outstanding = (user.dailyCollection || 0) - (user.dailyReturning || 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user.name || 'Unknown'}'s Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Date</h3>
            <p className="text-2xl font-bold">{user.dailyDate || 'N/A'}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Collection</h3>
            <p className="text-2xl font-bold">${(user.dailyCollection || 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Returning</h3>
            <p className="text-2xl font-bold">${(user.dailyReturning || 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Target</h3>
            <p className="text-2xl font-bold">${(user.totalTarget || 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Due</h3>
            <p className="text-2xl font-bold">${(user.totalDue || 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Amount To Pay</h3>
            <p className="text-2xl font-bold">${(user.amountToPay || 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Amount</h3>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Outstanding</h3>
            <p className="text-2xl font-bold">${outstanding.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Account Name</h3>
              <p className="text-lg">{user.bankDetails?.accountName || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Account Number</h3>
              <p className="text-lg">{user.bankDetails?.accountNumber || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Bank Name</h3>
              <p className="text-lg">{user.bankDetails?.bankName || 'N/A'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Payee Name</h3>
            <p className="text-lg">{user.payeeName || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerDashboard;