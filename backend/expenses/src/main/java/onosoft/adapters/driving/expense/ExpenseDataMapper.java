package onosoft.adapters.driving.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.commons.FormattedDate;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Expense;

@ApplicationScoped
public class    ExpenseDataMapper {

    @Inject
    protected MoneyDataMapper moneyDataMapper;


    public Expense dataToDomain(ExpenseJpaData data) throws AmountExceedsRangeException {

        final String paymentTargetDate = data.getPaymentTargetDate();
        final String paymentActualDate = data.getPaymentActualDate();

        return Expense.builder()
                .expenseId(data.getId())
                .accountNo(data.getAccountNo())
                .recipient(data.getRecipient())
                .purpose(data.getPurpose())
                .amount(moneyDataMapper.dataToDomain(data.getAmount()))
                .accruedDate(new FormattedDate(data.getAccruedDate()))
                .paymentTargetDate(paymentTargetDate != null ? new FormattedDate(paymentTargetDate): null)
                .paymentActualDate(paymentActualDate != null ? new FormattedDate(paymentActualDate): null)
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
    public ExpenseJpaData domainToData(Expense domain) {

        final FormattedDate paymentTargetDate = domain.getPaymentTargetDate();
        final FormattedDate paymentActualDate = domain.getPaymentActualDate();

        return ExpenseJpaData.builder()
                .id(domain.getExpenseId())
                .accountNo(domain.getAccountNo())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(moneyDataMapper.domainToData(domain.getAmount()))
                .accruedDate(domain.getAccruedDate().toString())
                .paymentTargetDate(paymentTargetDate != null ? paymentTargetDate.toString(): null)
                .paymentActualDate(paymentActualDate != null ? paymentActualDate.toString(): null)
                .isInvoiced(domain.isInvoiced())
                .paymentType(domain.getPaymentType())
                .expenseStatus(domain.getExpenseStatus())
                .build();
    }
}
