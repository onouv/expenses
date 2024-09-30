package onosoft.domain.exception;

import onosoft.commons.money.MoneyException;
import onosoft.domain.model.Currency;
import onosoft.commons.money.Money;

public class InvalidCurrencyException extends MoneyException {

    public InvalidCurrencyException(Money value, Currency target) {
        super(value, String.format("The value %s does not hold the currency of %s", value, target.toString()));
    }
}
