package onosoft.ports.driven.account;

public class NoSuchAccountException extends AccountException {

    public NoSuchAccountException(String accountNo) {
        super(accountNo, String.format("An account with no. %s does not exist.", accountNo));
    }
}
