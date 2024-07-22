package online.onosoft.usecases;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
public class AccountException extends RuntimeException {
    private String accountNo;

    public AccountException(String accountNo, String message) {
        super(message);
        this.accountNo = accountNo;
    }
}
