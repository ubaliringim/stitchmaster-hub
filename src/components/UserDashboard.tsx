import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetails } from "@/types/user";

interface UserDashboardProps {
  user: UserDetails;
}

const UserDashboard = ({ user }: UserDashboardProps) => {
  const totalAmount = user.totalDue * user.amountToPay;
  const outstanding = user.dailyCollection - user.dailyReturning;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user.name}'s Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Date</h3>
            <p className="text-2xl font-bold">{user.dailyDate}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Collection</h3>
            <p className="text-2xl font-bold">${user.dailyCollection.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Daily Returning</h3>
            <p className="text-2xl font-bold">${user.dailyReturning.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Target</h3>
            <p className="text-2xl font-bold">${user.totalTarget.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Due</h3>
            <p className="text-2xl font-bold">${user.totalDue.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Amount To Pay</h3>
            <p className="text-2xl font-bold">${user.amountToPay.toFixed(2)}</p>
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
              <p className="text-lg">{user.bankDetails.accountName}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Account Number</h3>
              <p className="text-lg">{user.bankDetails.accountNumber}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Bank Name</h3>
              <p className="text-lg">{user.bankDetails.bankName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Payee Name</h3>
            <p className="text-lg">{user.payeeName}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;