"use client";

import MoneyT from "@/common/types/MoneyT";
import { ReactElement } from "react";

type Props = {
  amount: MoneyT;
};

const MoneyAmount = ({ amount }: Props): ReactElement => {
  const display = toString(amount);
  return <div>{display}</div>;
};

const toString = (amount: MoneyT): string =>
  `${amount.value} ${amount.currency}`;

export default MoneyAmount;
