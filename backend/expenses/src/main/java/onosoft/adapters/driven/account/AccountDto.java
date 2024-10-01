package onosoft.adapters.driven.account;

import onosoft.adapters.driven.expense.dto.ExpenseDto;

import java.util.List;


public record AccountDto(
        String accountNo,
        String accountName,
        String accountDescription,
        List<ExpenseDto> expenses
) {}
