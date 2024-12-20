package onosoft.ports.driven.expense;

import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.exception.ExpensePreexistingException;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface ExpenseApiPort {

    void assignExpenseToAccount(AssignExpenseRequestDto expense)
            throws NoSuchAccountException, AmountExceedsRangeException, ExpensePreexistingException;

    void updateExpenseEntity(ExpenseEntityDto expense)
            throws NoSuchAccountException, NoSuchExpenseException, AmountExceedsRangeException;

    Expense getExpense(Long expenseId) throws NoSuchExpenseException, AmountExceedsRangeException, NoSuchAccountException;

    void deleteExpenseList(List<Long> expenseIds) throws NoSuchExpenseException;
}
