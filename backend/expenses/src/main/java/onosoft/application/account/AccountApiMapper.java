package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.account.AccountDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.expense.ExpenseApiMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class AccountApiMapper {

    @Inject
    ExpenseApiMapper expenseApiMapper;

    public AccountDto dtoFromDomain(Account domain) {
        final List<Expense> expenses = domain.getExpenses();
        final List<ExpenseEntityDto> dtos = new ArrayList<ExpenseEntityDto>();

        expenses.forEach(expense -> {
            dtos.add(this.expenseApiMapper.domainToEntityDto(expense));
        });

        return AccountDto
                .builder()
                .accountNo(domain.getAccountNo())
                .accountName(domain.getAccountName())
                .accountDescription(domain.getAccountDescription())
                .expenses(dtos)
                .build();
    }

}
