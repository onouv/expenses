import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";

export namespace ExpenseEntityDto {
  export type Type = Omit<
    ExpenseEntityT,
    "accruedDate" | "paymentTargetDate" | "paymentActualDate"
  > & {
    accruedDate: string;
    paymentTargetDate: string;
    paymentActualDate: string;
  };
  export const of = (domain: ExpenseEntityT): Type => {
    return {
      ...domain,
      amount: { ...domain.amount },
      accruedDate: domain.accruedDate.toLocaleDateString("sv"),
      paymentTargetDate: domain.paymentTargetDate.toLocaleDateString("sv"),
      paymentActualDate: domain.paymentActualDate.toLocaleDateString("sv"),
    };
  };

  export const to = (dto: Type): ExpenseEntityT => {
    return {
      ...dto,
      amount: {
        ...dto.amount,
      },
      accruedDate: new Date(dto.accruedDate),
      paymentTargetDate: new Date(dto.paymentTargetDate),
      paymentActualDate: new Date(dto.paymentActualDate),
    };
  };
}
