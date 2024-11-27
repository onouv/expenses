package onosoft.adapters.driven.expense.dto;

import java.util.List;

public record DeleteExpenseListRequestDto(List<Long> expenseIds) {}
