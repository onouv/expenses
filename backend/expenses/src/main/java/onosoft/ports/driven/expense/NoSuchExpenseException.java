package onosoft.ports.driven.expense;

public class NoSuchExpenseException extends ExpenseException {
    public NoSuchExpenseException(long expenseId) {
        super(expenseId, "No such expense");
    }
}
