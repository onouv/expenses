package onosoft.adapters.driven.account;

import onosoft.domain.model.Account;

public record AccountDto(String accountNo, String accountName, String accountDescription) {
    // List<Expense> expenses)

    public static AccountDto of(Account account) {
        return new AccountDto(
                account.getAccountNo(), account.getAccountName(), account.getAccountDescription()
                // account.getExpenses()
                );
    }
}
