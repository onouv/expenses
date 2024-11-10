import { mixed } from "yup";

enum PaymentTypeE {
  Unknown = "Unknown",
  Cash = "Cash",
  CreditCard = "CreditCard",
  ECCard = "ECCard",
  BankTransfer = "BankTransfer",
}

export const PaymentTypeESchema = mixed<PaymentTypeE>().oneOf(
  Object.values(PaymentTypeE),
);

export default PaymentTypeE;
