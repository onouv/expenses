import { mixed } from "yup";

enum CurrencyE {
  CHF = "CHF",
  EUR = "EUR",
  GBP = "GBP",
  USD = "USD",
}

export const CurrencyESchema = mixed<CurrencyE>().oneOf(
  Object.values(CurrencyE),
);

export default CurrencyE;

export const CURRENCIES = [
  {
    key: CurrencyE.CHF,
    name: "Swiss Francs",
    //icon: () => <CurrencyFrancIcon fontSize="sm" />,
  },
  { key: CurrencyE.EUR, name: "Euros" }, //icon: () => <EuroIcon fontSize="sm" /> },
  {
    key: CurrencyE.GBP,
    name: "British Pounds",
    //icon: () => <CurrencyPoundIcon fontSize="sm" />,
  },
  {
    key: CurrencyE.USD,
    name: "US Dollar",
  },
] as const;
