package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseData;
import onosoft.ports.driving.expense.ExpenseRepoPort;
import org.jboss.logging.Logger;

import java.util.ArrayList;
import java.util.List;

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
    public ExpenseEntityDto assignExpenseToAccount(AssignExpenseRequestDto dto)
            throws NoSuchAccountException, AmountExceedsRangeException {

        // TODO : work the domain entity rather than directly with the data entity
        // but that creates a Hibernate exception, because the data entity (DO) generated after
        // manipulating the domain entity is a different instance from the one read
        //AccountData accountData = accountRepo.findDOByAccountNo(dto.getAccountNo());
        Account account = accountRepo.findByAccountNo(dto.getAccountNo());//accountDataMapper.dataToDomain(accountData);
        Expense expense = expenseApiMapper.assignmentDtoToDomain(dto, account);
        account.addExpense(expense);

        ExpenseData expenseData = expenseDataMapper.domainToData(expense, accountData);
        List<ExpenseData> expenses = accountData.getExpenses();

        // business logic would go here...
        expenses.add(expenseData);

        accountRepo.persist(accountData);

        log.infof("Assigned expense of %s to account %s", expense.getAmount(),  dto.getAccountNo());

        return expenseApiMapper.domainToDto(expense);
    }

    @Override
    ExpenseEntityDto updateExpenseEntity(ExpenseEntityDto expenseDto)
            throws NoSuchExpenseException, AmountExceedsRangeException {

        Account account = accountRepo.findByAccountNo(expenseDto.getAccountNo());

        final ExpenseData expenseDO = this.expenseRepo.findById(expenseDto.getExpenseId());
        if (expenseDO == null) {
            throw new NoSuchExpenseException(expenseDto.getExpenseId());
        }

        final Expense storedExpense = expenseDataMapper.dataToDomain(expenseDO, account);
        final Expense updatingExpense = expenseApiMapper.entityDtoToDomain(expenseDto, account);

        storedExpense.updateWith(updatingExpense);


    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }


    @Override
    @Transactional
    public void deleteExpenseList(List<Long> expenseIds) throws NoSuchExpenseException {
        expenseIds.forEach(expenseId -> {
            if (this.expenseRepo.count("id", expenseId) == 0) {
                throw new NoSuchExpenseException(expenseId);
            }
        });

        expenseIds.forEach(expenseId -> {
            this.expenseRepo.deleteById(expenseId);
            log.infof("Deleted expense with id %s", expenseId);
        });
    }
}
