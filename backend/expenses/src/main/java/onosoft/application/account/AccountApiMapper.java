package onosoft.application.account;

import onosoft.adapters.driven.account.AccountDto;
import onosoft.adapters.driven.account.AccountMetaDto;
import onosoft.adapters.driven.expense.dto.ExpenseInfoDto;
import onosoft.application.expense.ExpenseApiMapper;
import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.ports.driving.account.AccountData;

import java.util.ArrayList;
import java.util.List;


public class AccountApiMapper {

    public static AccountDto dtoFromData(AccountData data) {
        final List<ExpenseInfoDto> expenses = new ArrayList<>();

        try {
            return AccountDto
                    .builder()
                    .accountNo(data.getAccountNo())
                    .accountName(data.getAccountName())
                    .accountDescription(data.getAccountDescription())
                    .expenses(ExpenseApiMapper.toExpenseInfoDtoList(data.getExpenses()))
                    .build();
        } catch (AmountExceedsRangeException x) {
          throw new Acc
        }
    }


    public static List<AccountMetaDto> dtoListFromDataList(List<AccountData> dataList) {

    }
}
