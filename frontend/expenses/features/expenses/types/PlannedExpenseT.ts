import { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, number, object, string } from "yup";
import { AccountNumSchema } from "@/features/accounts/types/AccountT";
import { CurrencyESchema } from "@/common/types/CurrencyE";
import { defaultMoney, MoneyTSchema } from "@/common/types/MoneyT";

export const PlannedExpenseTSchema = AccountNumSchema.shape({
  recipient: string().required().max(120),
  purpose: string().required().max(120),
  amount: MoneyTSchema,
  accruedDate: date().required(),
  paymentDate: date().required(),
  paymentType: PaymentTypeESchema,
  isInvoiced: boolean().required(),
});
Object.freeze(PlannedExpenseTSchema);

type PlannedExpenseT = InferType<typeof PlannedExpenseTSchema>;

type PlannedExpenseFieldNamesT = {
  accountNo: keyof Pick<PlannedExpenseT, "accountNo">;
  recipient: keyof Pick<PlannedExpenseT, "recipient">;
  amount: keyof Pick<PlannedExpenseT, "amount">;
  accruedDate: keyof Pick<PlannedExpenseT, "accruedDate">;
  paymentDate: keyof Pick<PlannedExpenseT, "paymentDate">;
  paymentType: keyof Pick<PlannedExpenseT, "paymentType">;
  isInvoiced: keyof Pick<PlannedExpenseT, "isInvoiced">;
};

export const fieldNames: PlannedExpenseFieldNamesT = {
  accountNo: "accountNo",
  recipient: "recipient",
  amount: "amount",
  accruedDate: "accruedDate",
  paymentDate: "paymentDate",
  paymentType: "paymentType",
  isInvoiced: "isInvoiced",
} as const;

export const defaultPlannedExpense: PlannedExpenseT = {
  accountNo: "",
  recipient: "",
  purpose: "",
  amount: defaultMoney,
  accruedDate: new Date(),
  paymentDate: new Date(),
  isInvoiced: true,
};
Object.freeze(defaultPlannedExpense);

export default PlannedExpenseT;
