package onosoft.application.expense;

import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.MoneyDataMapper;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.expense.ExpenseData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "jakarta-cdi", uses = {MoneyDataMapper.class, AccountDataMapper.class})
public interface ExpenseDataMapper {
    ExpenseDataMapper instance = Mappers.getMapper(ExpenseDataMapper.class);

    @Mapping(target = "accountNo", expression = "java(data.getAccount().getAccountNo())")
    @Mapping(source = "id", target = "expenseId")
    Expense dataToDomain(ExpenseData data);

    @InheritInverseConfiguration(name = "dataToDomain")
    default ExpenseData domainToData(Expense domain) {

        return ExpenseData.builder()
                .id(domain.getExpenseId())
                .recipient(domain.getRecipient())
                .purpose(domain.getPurpose())
                .amount(MoneyDataMapper.domainToData(domain.getAmount()))
                .accruedDate(domain.getAccruedDate())
                .paymentDate(domain.getPaymentDate())
                .invoiced(domain.isInvoiced())
                .paymentType(domain.getPaymentType())
                .paymentStatus(domain.getPaymentStatus())
                .build();
    }
}
