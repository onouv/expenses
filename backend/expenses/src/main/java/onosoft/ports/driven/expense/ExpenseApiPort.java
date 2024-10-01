package onosoft.ports.driven.expense;

import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseResponseDto;
import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface ExpenseApiPort {

    PlannedExpenseResponseDto assignExpenseToAccount(PlannedExpenseDto expense)
            throws NoSuchAccountException, AmountExceedsRangeException;
    List<Expense> getExpenses(String accountNo);
}
