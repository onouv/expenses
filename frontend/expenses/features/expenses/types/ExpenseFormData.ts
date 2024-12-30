import PaymentTypeE, { PaymentTypeESchema } from "@/common/types/PaymentTypeE";
import { boolean, date, InferType, object, string } from "yup";
import { defaultMoney, MoneyTSchema } from "@/common/types/MoneyT";

type FieldNamesT = {
  recipient: keyof Pick<ExpenseFormData.Type, "recipient">;
  purpose: keyof Pick<ExpenseFormData.Type, "purpose">;
  amount: keyof Pick<ExpenseFormData.Type, "amount">;
  accruedDate: keyof Pick<ExpenseFormData.Type, "accruedDate">;
  paymentTargetDate: keyof Pick<ExpenseFormData.Type, "paymentTargetDate">;
  paymentType: keyof Pick<ExpenseFormData.Type, "paymentType">;
  isInvoiced: keyof Pick<ExpenseFormData.Type, "isInvoiced">;
};

export namespace ExpenseFormData {
  export const Schema = object({
    recipient: string().required("Must enter a recipient").max(30),
    purpose: string().required("Must enter a purpose").max(30),
    amount: MoneyTSchema,
    accruedDate: date().required(),
    paymentTargetDate: date().required(),
    paymentType: PaymentTypeESchema.required(),
    isInvoiced: boolean().required(),
  });

  export type Type = InferType<typeof Schema>;
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

  export const FieldNames: FieldNamesT = {
    recipient: "recipient",
    purpose: "purpose",
    amount: "amount",
    accruedDate: "accruedDate",
    paymentTargetDate: "paymentTargetDate",
    paymentType: "paymentType",
    isInvoiced: "isInvoiced",
  };

  export const Defaults: Type = {
    recipient: "",
    purpose: "",
    amount: defaultMoney,
    accruedDate: new Date(),
    paymentTargetDate: new Date(),
    paymentType: PaymentTypeE.Unknown,
    isInvoiced: false,
  };
}

Object.freeze(ExpenseFormData.Schema);
Object.freeze(ExpenseFormData.FieldNames);
Object.freeze(ExpenseFormData.Defaults);
