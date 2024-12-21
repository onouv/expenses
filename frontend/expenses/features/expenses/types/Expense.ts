import PaymentTypeE from "@/common/types/PaymentTypeE";
import ExpenseBaseT from "@/common/types/ExpenseBaseT";
import ExpenseFormDataT from "@/features/expenses/types/ExpenseFormDataT";
import PaymentStatusE from "@/common/types/PaymentStatusE";

export namespace Expense {
  export type Type = ExpenseBaseT & {
    accountNo: string;
    paymentTargetDate: Date;
    paymentActualDate: Date | undefined;
    paymentType: PaymentTypeE;
    isInvoiced: boolean;
  };

  export const of = (formData: ExpenseFormDataT, accountNo: string): Type => {
    return {
      ...formData,
      accountNo: accountNo,
      paymentStatus: PaymentStatusE.PLANNED,
      paymentActualDate: undefined,
    };
  };
}
