export interface UserDetails {
  id: number;
  name: string;
  dailyDate: string;
  dailyCollection: number;
  dailyReturning: number;
  totalTarget: number;
  totalDue: number;
  amountToPay: number;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  payeeName: string;
}