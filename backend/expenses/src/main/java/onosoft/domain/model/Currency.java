package onosoft.domain.model;

public enum Currency {
    EUR("EUR"),
    CHF("CHF"),
    GBP("GBP");

    public final String value;

    Currency(String value) {
        this.value = value;
    }

    public String toString() {
        return this.value;
    }
}
