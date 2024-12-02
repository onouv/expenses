package onosoft.ports.driven.expense;

import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface ExpenseApiPort {

    void assignExpenseToAccount(AssignExpenseRequestDto expense)
            throws NoSuchAccountException, AmountExceedsRangeException;

    void updateExpenseEntity(ExpenseEntityDto expense)
            throws NoSuchExpenseException, AmountExceedsRangeException;

    List<Expense> getExpenses(String accountNo);

    void deleteExpenseList(List<Long> expenseIds) throws NoSuchExpenseException;
}
