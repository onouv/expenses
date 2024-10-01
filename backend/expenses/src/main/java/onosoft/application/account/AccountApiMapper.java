package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.adapters.driven.account.AccountDto;
import onosoft.adapters.driven.account.AccountMetaDto;
import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.ports.driving.account.AccountData;

import java.util.List;


@ApplicationScoped
public class AccountApiMapper {

    AccountDto dtoFromDO(AccountData dO) {
        return new AccountDto(
                dO.getAccountNo(),
                dO.getAccountName(),
                dO.getAccountDescription(),

        )
    }


    List<AccountMetaDto> dtoListFromDOList(List<AccountData> dataList)  throws AmountExceedsRangeException;
}
