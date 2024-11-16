import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import PlannedExpenseDTO from "@/features/expenses/features/assign/api/PlannedExpenseDTO";
import MoneyMapper from "@/features/expenses/features/assign/utils/MoneyMapper";

export default abstract class ApiMapper {
  public static domainToApi(domain: PlannedExpenseT): PlannedExpenseDTO {
    return {
      accountNo: domain.accountNo,
      recipient: domain.recipient,
      purpose: domain.purpose,
      amount: MoneyMapper.asMoney(domain.amount, domain.currency),
      accruedDate: domain.accruedDate,
      paymentDate: domain.paymentDate,
      paymentType: domain.paymentType,
      isInvoiced: domain.isInvoiced,
    };
  }
}
