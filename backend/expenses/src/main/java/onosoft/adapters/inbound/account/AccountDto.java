package onosoft.adapters.inbound.account;

import onosoft.domain.model.Account;

public record AccountDto(
        String accountNo,
        String name,
        String description) {
        //List<Expense> expenses)

    public static AccountDto of(Account account) {
        return new AccountDto(
                account.getAccountNo(),
                account.getName(),
                account.getDescription()
                //account.getExpenses()
        );
    }
}
