import MoneyT from "@/common/types/MoneyT";
import PaymentStatusE from "@/common/types/PaymentStatusE";

type ExpenseBaseT = {
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
  paymentStatus: PaymentStatusE;
};

export default ExpenseBaseT;
