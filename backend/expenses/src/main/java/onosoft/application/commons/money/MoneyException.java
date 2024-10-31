package onosoft.application.commons.money;

import onosoft.domain.model.Money;

public abstract class MoneyException extends Exception {
    private Money value;
    protected MoneyException(Money value, String message) {
        super(String.format("Money with value of %s: " + message, value.toString()));
        this.value = value;
    }
}
