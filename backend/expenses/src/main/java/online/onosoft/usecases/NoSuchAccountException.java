package online.onosoft.usecases;

public class NoSuchAccountException extends Exception {
    public NoSuchAccountException() {
        super("Requested account does not exist.");
    }
    public NoSuchAccountException(String accountNo) {
        super(String.format("An account with no. %s does not exist.", accountNo));
    }
}
