import PaymentTypeE, { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, object, string } from "yup";
import MoneyT, { defaultMoney, MoneyTSchema } from "@/common/types/MoneyT";

export const ExpenseFormDataTSchema = object({
  recipient: string().required().max(120),
  purpose: string().required().max(120),
  amount: MoneyTSchema,
  accruedDate: date().required(),
  paymentTargetDate: date().required(),
  paymentType: PaymentTypeESchema.required(),
  isInvoiced: boolean().required(),
});
Object.freeze(ExpenseFormDataTSchema);

type ExpenseFormDataT = InferType<typeof ExpenseFormDataTSchema>;
/*
{
  recipient: string;
  purpose: string;
  amount: MoneyT;
  accruedDate: Date;
  paymentTargetDate: Date;
  paymentType: PaymentTypeE;
  isInvoiced: boolean;
};
 */

type ExpenseFieldNamesT = {
  recipient: keyof Pick<ExpenseFormDataT, "recipient">;
  purpose: keyof Pick<ExpenseFormDataT, "purpose">;
  amount: keyof Pick<ExpenseFormDataT, "amount">;
  accruedDate: keyof Pick<ExpenseFormDataT, "accruedDate">;
  paymentTargetDate: keyof Pick<ExpenseFormDataT, "paymentTargetDate">;
  paymentType: keyof Pick<ExpenseFormDataT, "paymentType">;
  isInvoiced: keyof Pick<ExpenseFormDataT, "isInvoiced">;
};

export const expenseFieldNames: ExpenseFieldNamesT = {
  recipient: "recipient",
  purpose: "purpose",
  amount: "amount",
  accruedDate: "accruedDate",
  paymentTargetDate: "paymentTargetDate",
  paymentType: "paymentType",
  isInvoiced: "isInvoiced",
} as const;

export const defaultExpenseFormData: ExpenseFormDataT = {
  recipient: "",
  purpose: "",
  amount: defaultMoney,
  accruedDate: new Date(),
  paymentTargetDate: new Date(),
  paymentType: PaymentTypeE.Unknown,
  isInvoiced: false,
};
Object.freeze(defaultExpenseFormData);

export default ExpenseFormDataT;
