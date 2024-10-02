package onosoft.adapters.driven.account;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class AccountMetaDto {
    String accountNo;
    String accountName;
    String accountDescription;
}

