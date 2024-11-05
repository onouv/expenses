package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.expense.ExpenseData;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

//@Mapper(componentModel = "jakarta-cdi", uses= ExpenseDataMapper.class)
@ApplicationScoped
public class AccountDataMapper {

    @Inject
    protected ExpenseDataMapper expenseDataMapper;

    public Account dataToDomain(AccountData data) throws AmountExceedsRangeException {
        final Account account = Account.builder()
                .accountNo(data.getAccountNo())
                .accountName(data.getAccountName())
                .accountDescription(data.getAccountDescription())
                .build();

        final List<Expense> expenses = new ArrayList<>();
        Iterator<ExpenseData> iter = data.getExpenses().iterator();
        while (iter.hasNext()) {
            expenses.add(expenseDataMapper.dataToDomain(iter.next(), account));
        }
        account.setExpenses(expenses);

        return account;
    }

    public AccountData domainToData(Account domain) {
        final AccountData data = AccountData.builder()
                .accountNo(domain.getAccountNo())
                .accountName(domain.getAccountName())
                .accountDescription(domain.getAccountDescription())
                .build();

        final List<ExpenseData> expenses = domain.getExpenses()
                .stream()
                .map(expense -> expenseDataMapper.domainToData(expense, data))
                .toList();
        data.setExpenses(expenses);

        return data;
    }

    List<Account> dataListToDomainList(List<AccountData> dataList) throws AmountExceedsRangeException {
        final List<Account> domainList = new ArrayList<>();
        Iterator<AccountData> iter = dataList.iterator();
        while (iter.hasNext()) {
            domainList.add(dataToDomain(iter.next()));
        }

        return domainList;
    }
}
