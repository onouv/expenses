package onosoft.adapters.driven.account;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.expense.dto.ExpenseInfoDto;

import java.util.List;

@SuperBuilder
@Data
public class AccountDto extends AccountMetaDto {
        List<ExpenseInfoDto> expenses;
}
