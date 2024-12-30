import { Expense } from "@/features/expenses/types/Expense";

export namespace ExpenseDto {
  export type Type = Omit<
    Expense.Type,
    "accruedDate" | "paymentTargetDate" | "paymentActualDate"
  > & {
    accruedDate: string;
    paymentTargetDate: string;
    paymentActualDate: string;
  };

  export function of(domain: Expense.Type): Type {
    return {
      ...domain,
      amount: { ...domain.amount },
      accruedDate: domain.accruedDate.toLocaleDateString("sv"),
      paymentTargetDate: domain.paymentTargetDate.toLocaleDateString("sv"),
      paymentActualDate: domain.paymentActualDate
        ? domain.paymentActualDate.toLocaleDateString("sv")
        : "",
    };
  }
}
