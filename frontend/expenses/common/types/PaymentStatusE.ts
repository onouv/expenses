import { mixed } from "yup";

enum PaymentStatusE {
  PLANNED = "PLANNED",
  INVOICED = "INVOICED",
  DUE = "DUE",
  OVERDUE = "OVERDUE",
  PAID = "PAID",
}
export const PaymentStatusESchema = mixed<PaymentStatusE>().oneOf(
  Object.values(PaymentStatusE),
);

export default PaymentStatusE;
