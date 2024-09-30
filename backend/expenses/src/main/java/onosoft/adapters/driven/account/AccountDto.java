package onosoft.adapters.driven.account;

import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;

import java.util.List;


public record AccountDto(
        String accountNo,
        String accountName,
        String accountDescription,
        List<Expense> expenses
) {}
