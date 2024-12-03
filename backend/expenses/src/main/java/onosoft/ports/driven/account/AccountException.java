package onosoft.ports.driven.account;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public abstract class AccountException extends Exception {
    private String accountNo;

    protected AccountException(String accountNo, String message) {
        super(message);
        this.accountNo = accountNo;
    }
}
