package online.onosoft.usecases;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DuplicateAccountNoException extends AccountException {
    public DuplicateAccountNoException(String accountNo) {
        super(accountNo, String.format("An account with number %s already exists.", accountNo));
    }
}
