import { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, string } from "yup";
import { AccountNumSchema } from "@/features/accounts/types/AccountT";
import CurrencyE, { CurrencyESchema } from "@/common/types/CurrencyE";

export const TWO_DIGIT_DECIMAL_US: RegExp =
  /((\d{1,3}(,\d{3})+)|(\d*))(\.\d{1,2})?/g;

export const PlannedExpenseTSchema = AccountNumSchema.shape({
  recipient: string().required().max(120),
  purpose: string().required().max(120),
  amount: string().required().matches(TWO_DIGIT_DECIMAL_US),
  currency: CurrencyESchema.required(),
  accruedDate: date().required(),
  paymentDate: date().required(),
  paymentType: PaymentTypeESchema,
  isInvoiced: boolean().required(),
});
Object.freeze(PlannedExpenseTSchema);

type PlannedExpenseT = InferType<typeof PlannedExpenseTSchema>;
/*
{
  accountNo: string;
  recipient: string;
  purpose: string;
  amount: string;
  currency: CurrencyE;
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
  amount: "",
  currency: CurrencyE.EUR,
  accruedDate: new Date(),
  paymentDate: new Date(),
  isInvoiced: true,
};

Object.freeze(defaultPlannedExpense);
export default PlannedExpenseT;
