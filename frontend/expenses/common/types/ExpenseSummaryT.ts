import PaymentStatusE from "@/common/types/PaymentStatusE";
import MoneyT from "@/common/types/MoneyT";

type ExpenseSummaryT = {
  expenseId: number;
  paymentStatus: PaymentStatusE;
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
};

export default ExpenseSummaryT;
