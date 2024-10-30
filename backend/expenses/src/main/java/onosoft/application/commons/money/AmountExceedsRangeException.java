package onosoft.application.commons.money;

public class AmountExceedsRangeException extends MoneyException {
    public AmountExceedsRangeException(Money amount) {
        super(amount, String.format("adding an amount of %s exceeds permitted range."));
    }
}
