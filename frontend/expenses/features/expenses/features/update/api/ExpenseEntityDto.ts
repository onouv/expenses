import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

export namespace ExpenseEntityDto {
  export type Type = Omit<
    ExpenseEntityT,
    "accruedDate" | "paymentTargetDate"
  > & {
    accruedDate: string;
    paymentTargetDate: string;
  };
  export const of = (domain: ExpenseEntityT): Type => {
    return {
      ...domain,
      amount: { ...domain.amount },
      accruedDate: domain.accruedDate.toLocaleDateString("sv"),
      paymentTargetDate: domain.paymentTargetDate.toLocaleDateString("sv"),
    };
  };

  export const to = (dto: Type): ExpenseEntityT => {
    return {
      ...dto,
      amount: {
        ...dto.amount
      },
      accruedDate: new Date(dto.accruedDate),
      paymentTargetDate: new Date(dto.paymentTargetDate),
      paymentActualDate: new Date()
    }
  }
}
