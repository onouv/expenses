import { MoneyTSchema } from "@/common/types/MoneyT";
import { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, string } from "yup";
import { AccountNumSchema } from "@/features/accounts/types/AccountT";
import CurrencyE from "@/features/accounts/types/CurrencyE";

export const PlannedExpenseTSchema = AccountNumSchema.shape({
  recipient: string()
    .required()
    .matches(/<w{1,120}/),
  purpose: string()
    .required()
    .matches(/<w{1,120}/),
  amount: MoneyTSchema.required(),
  accruedDate: date().required(),
  paymentDate: date().required(),
  paymentTypeE: PaymentTypeESchema,
  isInvoiced: boolean().required(),
});

type PlannedExpenseT = InferType<typeof PlannedExpenseTSchema>;
/*
{
  accountNo: string;
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
  paymentDate: Date;
  paymentType: PaymentTypeE;
  isInvoiced: boolean;
}
 */

export const defaultPlannedExpense: PlannedExpenseT = {
  accountNo: "",
  recipient: "",
  purpose: "",
  amount: {
    amountMajor: 0,
    amountMinor: 0,
    currency: CurrencyE.EUR,
  },
  accruedDate: new Date(),
  paymentDate: new Date(),
  isInvoiced: true,
};

export default PlannedExpenseT;
