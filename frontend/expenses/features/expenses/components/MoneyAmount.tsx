import MoneyT from "@/features/accounts/types/MoneyT";
import { ReactElement } from "react";

type Props = {
  amount: MoneyT;
};

const MoneyAmount = ({ amount }: Props): ReactElement => {
  const display = toString(amount);
  return <div>{display}</div>;
};

const toString = (amount: MoneyT): string =>
  `${amount.amountMajor},${amount.amountMinor} ${amount.currency}`;

export default MoneyAmount;
