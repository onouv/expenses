import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

export namespace PlannedExpenseDto {
  export type Type = Omit<
    PlannedExpenseT,
    "accruedDate" | "paymentTargetDate"
  > & {
    accruedDate: string;
    paymentTargetDate: string;
  };

  export function of(domain: PlannedExpenseT): Type {
    return {
      ...domain,
      amount: { ...domain.amount },
      accruedDate: domain.accruedDate.toLocaleDateString("sv"),
      paymentTargetDate: domain.paymentTargetDate.toLocaleDateString("sv"),
    };
  }
}
