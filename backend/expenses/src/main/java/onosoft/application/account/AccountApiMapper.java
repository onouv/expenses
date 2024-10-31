package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.account.AccountDto;
import onosoft.adapters.driven.account.AccountMetaDto;
import onosoft.adapters.driven.expense.dto.ExpenseInfoDto;
import onosoft.application.expense.ExpenseApiMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.ports.driven.account.InvalidAccountDataException;
import onosoft.ports.driving.account.AccountData;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@ApplicationScoped
public class AccountApiMapper {

    @Inject
    ExpenseApiMapper expenseApiMapper;

    public AccountDto dtoFromData(AccountData data) {
        final List<ExpenseInfoDto> expenses = new ArrayList<>();

        try {
            return AccountDto
                    .builder()
                    .accountNo(data.getAccountNo())
                    .accountName(data.getAccountName())
                    .accountDescription(data.getAccountDescription())
                    .expenses(expenseApiMapper.toExpenseInfoDtoList(data.getExpenses()))
                    .build();
        } catch (AmountExceedsRangeException x) {
          throw new InvalidAccountDataException(data.getAccountNo(), x.getMessage());
        }
    }


    public static List<AccountMetaDto> dtoListFromDataList(List<AccountData> dataList) {
        List<AccountMetaDto> dtos = new ArrayList<>();
        Iterator<AccountData> iter = dataList.iterator();

        while (iter.hasNext()) {
            final AccountData data = iter.next();
            dtos.add(AccountMetaDto
                    .builder()
                    .accountNo(data.getAccountNo())
                    .accountName(data.getAccountName())
                    .accountDescription(data.getAccountDescription())
                    .build());
        }

        return dtos;
    }
}
