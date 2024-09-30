package onosoft.adapters.driven.expense;

import onosoft.ports.driven.commons.money.MoneyDto;

import java.util.Date;

public record ExpenseDto(MoneyDto amount, String purpose, Date accrued) {}
