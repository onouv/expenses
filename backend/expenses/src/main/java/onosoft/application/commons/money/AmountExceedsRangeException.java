package onosoft.application.commons.money;

import onosoft.domain.model.Money;

public class AmountExceedsRangeException extends MoneyException {
    public AmountExceedsRangeException(Money amount) {
        super(amount, String.format("adding an amount of %s exceeds permitted range.", amount.toString()));
    }
}
