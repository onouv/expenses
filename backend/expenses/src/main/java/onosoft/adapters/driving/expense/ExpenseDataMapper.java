package onosoft.adapters.driving.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.adapters.driving.account.AccountJpaData;

@ApplicationScoped
public class    ExpenseDataMapper {

    @Inject
    protected MoneyDataMapper moneyDataMapper;


    public Expense dataToDomain(ExpenseJpaData data, Account account) throws AmountExceedsRangeException {
        return Expense.builder()
                .account(account)
                .expenseId(data.getId())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(moneyDataMapper.dataToDomain(data.getAmount()))
                .accruedDate(data.getAccruedDate())
                .paymentTargetDate(data.getPaymentTargetDate())
                .paymentActualDate(data.getPaymentActualDate())
                .isInvoiced(data.isInvoiced())
                .paymentType(data.getPaymentType())
                .expenseStatus(data.getExpenseStatus())
                .build();
    }


    /**
     *
     * @param domain the domain object to be mapped into its respective data object
     * @param account the parent data object (inserted as an instance, to avoid infinite recursion)
     * @return
     */
    public ExpenseJpaData domainToData(Expense domain, AccountJpaData account) {

        return ExpenseJpaData.builder()
                .id(domain.getExpenseId())
                .account(account)
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyDataMapper.domainToData(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .paymentTargetDate(domain.getPaymentTargetDate())
                .isInvoiced(domain.isInvoiced())
                .paymentType(domain.getPaymentType())
                .expenseStatus(domain.getExpenseStatus())
                .build();
    }
}
