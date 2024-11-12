import MoneyT, { MoneyTSchema } from "@/common/types/MoneyT";
import PaymentTypeE from "@/common/types/PaymentTypeE";

type PlannedExpenseDTO = {
  accountNo: string;
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
  paymentDate: Date;
  paymentType: PaymentTypeE;
  isInvoiced: boolean;
};

export default PlannedExpenseDTO;
