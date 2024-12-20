package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.adapters.driving.expense.ExpenseDataMapper;
import onosoft.adapters.driving.expense.ExpenseJpaData;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.exception.ExpensePreexistingException;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseRepoPort;
import org.jboss.logging.Logger;
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
            throws NoSuchAccountException, AmountExceedsRangeException, ExpensePreexistingException {

        if (! accountRepo.accountExists(dto.getAccountNo())) {
            throw new NoSuchAccountException(dto.getAccountNo());
        }

        Account account = accountRepo.loadAccount(dto.getAccountNo());
        Expense expense = expenseApiMapper.assignmentDtoToDomain(dto);
        account.addExpense(expense);

        accountRepo.updateAccount(account);

        log.infof("Assigned expense of %s to account %s", expense.getAmount(),  dto.getAccountNo());

    }


    @Transactional
    public Expense getExpense(Long expenseId) throws NoSuchExpenseException, AmountExceedsRangeException, NoSuchAccountException {
        ExpenseJpaData data = this.expenseRepo.loadExpense(expenseId);

        return expenseDataMapper.dataToDomain(data);
    }

    @Override
    public void updateExpenseEntity(ExpenseEntityDto dto)
            throws NoSuchAccountException, NoSuchExpenseException, AmountExceedsRangeException {

        Account account = accountRepo.loadAccount(dto.getAccountNo());
        Optional<Expense> opt = account.getExpense(dto.getExpenseId());

        if(opt.isEmpty()) {
            throw new NoSuchExpenseException(dto.getExpenseId());
        }

        Expense expense = opt.get();
        Expense update = expenseApiMapper.entityDtoToDomain(dto);
        expense.updateWith(update);

        accountRepo.updateAccount(account);

    }

    @Override
    @Transactional
    public void deleteExpenseList(List<Long> expenseIds) throws NoSuchExpenseException {
        for (Long expenseId : expenseIds) {
            this.expenseRepo.deleteExpense(expenseId);
            log.infof("Deleted expense %s", expenseId);
        }
    }
}
