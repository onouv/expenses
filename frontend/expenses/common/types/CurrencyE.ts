import { mixed } from "yup";

enum CurrencyE {
  CHF = "CHF",
  EUR = "EUR",
  GBP = "GBP",
}

export const CurrencyESchema = mixed<CurrencyE>().oneOf(
  Object.values(CurrencyE),
);

export default CurrencyE;
