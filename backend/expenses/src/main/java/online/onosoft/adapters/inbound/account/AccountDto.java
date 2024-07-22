package online.onosoft.adapters.inbound.account;

import online.onosoft.domain.model.Account;
import online.onosoft.domain.model.Expense;

import java.util.List;

public record AccountDto(
        String accountNo,
        String name,
        String description,
        List<Expense> expenses) {

    public static AccountDto of(Account account) {
        return new AccountDto(
                account.getAccountNo(),
                account.getName(),
                account.getDescription(),
                account.getExpenses());
    }
}
