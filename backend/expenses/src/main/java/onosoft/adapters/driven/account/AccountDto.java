package onosoft.adapters.driven.account;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
public class AccountDto extends AccountMetaDto {
        List<ExpenseEntityDto> expenses;
}
