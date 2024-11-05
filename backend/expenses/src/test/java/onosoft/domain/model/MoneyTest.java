package onosoft.domain.model;

import org.apache.commons.math3.util.Precision;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
class MoneyTest {

    @Test
    void valueMatchesCreationByValue() {
        Money.Value amount = new Money.Value(9400, 50);
        Money money = new Money(amount, Currency.EUR);
        Money.Value value = money.getValue();
        assertEquals(amount.major, value.major);
        assertEquals(amount.minor, value.minor);
    }

    @Test
    void valueMatchesCreationByMicroUnitsDownRounded() {
        Money money = new Money(9400553, Currency.EUR);
        Money.Value value = money.getValue();
        assertEquals(9400, value.major);
        assertEquals(55, value.minor);
    }

    @Test
    void valueMatchesCreationByMicroUnitsUpRounded() {
        Money money = new Money(9400556, Currency.EUR);
        Money.Value value = money.getValue();
        assertEquals(9400, value.major);
        assertEquals(56, value.minor);
    }

    @Test
    void addingTwoMoneysEqualCurrency() {
        Money m1 = new Money(new Money.Value(105, 23), Currency.EUR);
        Money m2 = new Money(new Money.Value(5, 35), Currency.EUR);

        try {
            Money result = m1.add(m2);
            assertEquals(110, result.getValue().major);
            assertEquals(58, result.getValue().minor);
        } catch (Exception e) {
            fail(e.getMessage());
        }
    }
}