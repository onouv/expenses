import PaymentStatusE from "@/features/accounts/types/PaymentStatusE";
import MoneyT from "@/features/accounts/types/MoneyT";

type ExpenseT = {
  expenseId: number;
  paymentStatus: PaymentStatusE;
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
};

export default ExpenseT;
