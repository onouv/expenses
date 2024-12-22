import { ExpenseEntity } from "@/features/expenses/types/ExpenseEntity";

export namespace ExpenseEntityDto {
  export type Type = Omit<
    ExpenseEntity.Type,
    "accruedDate" | "paymentTargetDate" | "paymentActualDate"
  > & {
    accruedDate: string;
    paymentTargetDate: string;
    paymentActualDate: string;
  };
  export const of = (domain: ExpenseEntity.Type): Type => {
    return {
      ...domain,
      amount: { ...domain.amount },
      accruedDate: domain.accruedDate.toLocaleDateString("sv"),
      paymentTargetDate: domain.paymentTargetDate.toLocaleDateString("sv"),
      paymentActualDate: domain.paymentActualDate
        ? domain.paymentActualDate.toLocaleDateString("sv")
        : "",
    };
  };

  export const to = (dto: Type): ExpenseEntity.Type => {
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
