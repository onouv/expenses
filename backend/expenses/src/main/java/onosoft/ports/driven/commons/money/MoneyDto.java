package onosoft.ports.driven.commons.money;

import jakarta.validation.constraints.Positive;
import onosoft.domain.model.Currency;

public record MoneyDto(@Positive long amountMicroUnits, Currency currency) {}
