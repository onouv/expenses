import PaymentTypeE, { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, string } from "yup";
import { AccountNumSchema } from "@/features/accounts/types/AccountT";
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
  purpose: keyof Pick<PlannedExpenseT, "purpose">;
  amount: keyof Pick<PlannedExpenseT, "amount">;
  accruedDate: keyof Pick<PlannedExpenseT, "accruedDate">;
  paymentDate: keyof Pick<PlannedExpenseT, "paymentDate">;
  paymentType: keyof Pick<PlannedExpenseT, "paymentType">;
  isInvoiced: keyof Pick<PlannedExpenseT, "isInvoiced">;
};

export const plannedExpenseFieldNames: PlannedExpenseFieldNamesT = {
  accountNo: "accountNo",
  recipient: "recipient",
  purpose: "purpose",
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
  paymentType: PaymentTypeE.Unknown,
  isInvoiced: false,
};
Object.freeze(defaultPlannedExpense);

export function equals(left: PlannedExpenseT, right: PlannedExpenseT): boolean {
  return (
    left.accountNo == right.accountNo &&
    left.recipient == right.recipient &&
    left.purpose == right.purpose &&
    left.amount.value == right.amount.value &&
    left.amount.currency == right.amount.currency &&
    left.accruedDate == right.accruedDate &&
    left.paymentDate == right.paymentDate &&
    left.paymentType == right.paymentType
  );
}

export default PlannedExpenseT;
