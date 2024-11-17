import CurrencyE, { CurrencyESchema } from "@/common/types/CurrencyE";
import { InferType, number, object, string } from "yup";

export const TWO_DIGIT_DECIMAL_US: RegExp =
  /((^([1-9](\d{0,2}))(,\d{3})*)(\.\d{1,2})?)|0(\.\d{1,2})?/g;

export const MoneyTSchema = object({
  value: string().required().matches(TWO_DIGIT_DECIMAL_US),
  currency: CurrencyESchema,
});

type MoneyT = InferType<typeof MoneyTSchema>;

export const defaultMoney: MoneyT = {
  value: "0.00",
  currency: CurrencyE.EUR,
} as const;

type MoneyFieldNamesT = {
  value: keyof Pick<MoneyT, "value">;
  currency: keyof Pick<MoneyT, "currency">;
};

export const fieldNames: MoneyFieldNamesT = {
  value: "value",
  currency: "currency",
};

export default MoneyT;
