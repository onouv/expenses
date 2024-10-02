package onosoft.ports.driven.account;

public class InvalidAccountDataException extends AccountException {
    public InvalidAccountDataException(String accountNo, String message) {
        super(accountNo,
              String.format(
                     "invalid data for creating account: %s", message));
    }
}
