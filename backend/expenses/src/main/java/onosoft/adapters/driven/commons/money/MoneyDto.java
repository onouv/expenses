package onosoft.adapters.driven.commons.money;

import onosoft.domain.model.Currency;

public record MoneyDto(
        String value,
        Currency currency
) {}
