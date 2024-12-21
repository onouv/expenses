import CurrencyE, { CurrencyESchema } from "@/common/types/CurrencyE";
import { InferType, number, object, string } from "yup";

export const TWO_DIGIT_DECIMAL_US: RegExp =
  /^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]{1,2}){0,1}$/g;

export const MoneyTSchema = object({
  value: string().required().matches(TWO_DIGIT_DECIMAL_US),
  currency: CurrencyESchema.required(),
});

type MoneyT = {
  value: string;
  currency: CurrencyE;
};

export const defaultMoney: MoneyT = {
  value: "0.00",
  currency: CurrencyE.EUR,
} as const;

type MoneyFieldNamesT = {
  value: keyof Pick<MoneyT, "value">;
  currency: keyof Pick<MoneyT, "currency">;
};

export const moneyFieldNames: MoneyFieldNamesT = {
  value: "value",
  currency: "currency",
};

export default MoneyT;
