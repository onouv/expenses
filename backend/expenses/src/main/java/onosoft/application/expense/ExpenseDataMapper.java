package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.expense.ExpenseData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@ApplicationScoped
public class    ExpenseDataMapper {

    @Inject
    MoneyDataMapper moneyDataMapper;

    /*
    Expense dataToDomain(ExpenseData data) {
        return Expense.builder()
                .accountNo(data.getAccount().getAccountNo())
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
     */

    ExpenseData domainToData(Expense domain) {

        return ExpenseData.builder()
                .id(domain.getExpenseId())
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
