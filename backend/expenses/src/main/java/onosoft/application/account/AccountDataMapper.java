package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.account.AccountJpaData;
import onosoft.ports.driving.expense.ExpenseJpaData;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

//@Mapper(componentModel = "jakarta-cdi", uses= ExpenseDataMapper.class)
@ApplicationScoped
public class AccountDataMapper {

    @Inject
    protected ExpenseDataMapper expenseDataMapper;

    public Account dataToDomain(AccountJpaData data) throws AmountExceedsRangeException {
        final Account account = Account.builder()
                .accountNo(data.getAccountNo())
                .accountName(data.getAccountName())
                .accountDescription(data.getAccountDescription())
                .build();

        final List<Expense> expenses = new ArrayList<>();
        Iterator<ExpenseJpaData> iter = data.getExpenses().iterator();
        while (iter.hasNext()) {
            expenses.add(expenseDataMapper.dataToDomain(iter.next(), account));
        }
        account.setExpenses(expenses);

        return account;
    }

    public AccountJpaData domainToData(Account domain) {
        final AccountJpaData data = AccountJpaData.builder()
                .accountNo(domain.getAccountNo())
                .accountName(domain.getAccountName())
                .accountDescription(domain.getAccountDescription())
                .build();

        final List<ExpenseJpaData> expenses = domain.getExpenses()
                .stream()
                .map(expense -> expenseDataMapper.domainToData(expense, data))
                .toList();
        data.setExpenses(expenses);

        return data;
    }

    List<Account> dataListToDomainList(List<AccountJpaData> dataList) throws AmountExceedsRangeException {
        final List<Account> domainList = new ArrayList<>();
        Iterator<AccountJpaData> iter = dataList.iterator();
        while (iter.hasNext()) {
            domainList.add(dataToDomain(iter.next()));
        }

        return domainList;
    }
}
