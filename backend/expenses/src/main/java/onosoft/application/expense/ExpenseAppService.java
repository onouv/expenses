package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseRepoPort;
import org.jboss.logging.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ExpenseAppService implements ExpenseApiPort {

    private static final Logger log = Logger.getLogger(ExpenseAppService.class);

    @Inject
    AccountRepoPort accountRepo;

    @Inject
    ExpenseRepoPort expenseRepo;

    @Inject
    ExpenseApiMapper expenseApiMapper;

    @Inject
    ExpenseDataMapper expenseDataMapper;

    @Transactional
    public void assignExpenseToAccount(AssignExpenseRequestDto dto)
            throws NoSuchAccountException, AmountExceedsRangeException {

        if (! accountRepo.accountExists(dto.getAccountNo())) {
            throw new NoSuchAccountException(dto.getAccountNo());
        }

        Account account = accountRepo.loadAccount(dto.getAccountNo());
        Expense expense = expenseApiMapper.assignmentDtoToDomain(dto, account);
        account.addExpense(expense);

        accountRepo.saveAccount(account);

        log.infof("Assigned expense of %s to account %s", expense.getAmount(),  dto.getAccountNo());

    }

    @Override
    public void updateExpenseEntity(ExpenseEntityDto dto)
            throws NoSuchExpenseException, AmountExceedsRangeException {

        Account account = accountRepo.loadAccount(dto.getAccountNo());
        Optional<Expense> opt = account.getExpense(dto.getExpenseId());

        if(opt.isEmpty()) {
            throw new NoSuchExpenseException(dto.getExpenseId());
        }

        Expense expense = opt.get();
        Expense update = expenseApiMapper.entityDtoToDomain(dto, account);
        expense.updateWith(update);

        accountRepo.updateAccount(account);

    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }

    @Override
    @Transactional
    public void deleteExpenseList(List<Long> expenseIds) throws NoSuchExpenseException {
        expenseIds.forEach(expenseId -> {
            if (! this.expenseRepo.expenseExists(expenseId)) {
                throw new NoSuchExpenseException(expenseId);
            }

            this.expenseRepo.deleteExpense(expenseId);
            log.infof("Deleted expense with id %s", expenseId);
        });
    }
}
