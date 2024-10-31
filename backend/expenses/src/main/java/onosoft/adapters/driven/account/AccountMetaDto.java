package onosoft.adapters.driven.account;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@NoArgsConstructor
public class AccountMetaDto {
    String accountNo;
    String accountName;
    String accountDescription;
}

