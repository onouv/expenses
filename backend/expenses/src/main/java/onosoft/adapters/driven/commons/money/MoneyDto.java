package onosoft.adapters.driven.commons.money;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;
import onosoft.domain.model.Currency;

public record MoneyDto(
        @Positive
        long amountMajor,
        @DecimalMin(value = "0")
        @DecimalMax(value = "99")
        int amountMinor,

        Currency currency
) {}
