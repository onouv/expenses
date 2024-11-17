import CurrencyE, { CurrencyESchema } from "@/common/types/CurrencyE";
import { InferType, number, object } from "yup";

export const MoneyTSchema = object({
  amountMajor: number().required().min(0).integer(),
  amountMinor: number().required().min(0).max(99).integer(),
  currency: CurrencyESchema,
});

type MoneyT = InferType<typeof MoneyTSchema>;
/*
{
  amountMajor: number;
  amountMinor: number;
  currency: CurrencyE;
};
 */

export const defaultMoney: MoneyT = {
  amountMajor: 0,
  amountMinor: 0,
  currency: CurrencyE.EUR,
} as const;

type MoneyFieldNamesT = {
  amountMajor: keyof Pick<MoneyT, "amountMajor">;
  amountMinor: keyof Pick<MoneyT, "amountMinor">;
  currency: keyof Pick<MoneyT, "currency">;
};

export const fieldNames: MoneyFieldNamesT = {
  amountMajor: "amountMajor",
  amountMinor: "amountMinor",
  currency: "currency",
};

export default MoneyT;
