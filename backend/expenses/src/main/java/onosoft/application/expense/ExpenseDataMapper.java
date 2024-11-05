package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.expense.ExpenseData;

@ApplicationScoped
public class    ExpenseDataMapper {

    @Inject
    protected MoneyDataMapper moneyDataMapper;


    public Expense dataToDomain(ExpenseData data, Account account) throws AmountExceedsRangeException {
        return Expense.builder()
                .account(account)
                .expenseId(data.getId())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(moneyDataMapper.dataToDomain(data.getAmount()))
                .accruedDate(data.getAccruedDate())
                .paymentDate(data.getPaymentDate())
                .invoiced(data.isInvoiced())
                .paymentType(data.getPaymentType())
                .paymentStatus(data.getPaymentStatus())
                .build();
    }


    /**
     *
     * @param domain the domain object to be mapped into its respective data object
     * @param account the parent data object (inserted as an instance, to avoid infinite recursion)
     * @return
     */
    public ExpenseData domainToData(Expense domain, AccountData account) {

        return ExpenseData.builder()
                .id(domain.getExpenseId())
                .account(account)
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyDataMapper.domainToData(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .paymentDate(domain.getPaymentDate())
                .invoiced(domain.isInvoiced())
                .paymentType(domain.getPaymentType())
                .paymentStatus(domain.getPaymentStatus())
                .build();
    }
}
