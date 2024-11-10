import CurrencyE, {
  CurrencyESchema,
} from "@/features/accounts/types/CurrencyE";
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

export default MoneyT;
