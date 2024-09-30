package onosoft.commons.money;

import onosoft.commons.money.Money;

public class MoneyException extends Exception {
    private Money value;
    public MoneyException(Money value, String message) {
        super(message);
        this.value = value;
    }
}
