package onosoft.application.expense;

import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.commons.money.Money;

public class MoneyApiMapper {
    public static Money dtoToDomain(MoneyDto dto) throws AmountExceedsRangeException {
        return new Money(
                new Money.Value(dto.amountMajor(),dto.amountMinor()),
                dto.currency());
    }

    public static MoneyDto domainToDto(Money domain) {
        final Money.Value amount = domain.getValue();

        return new MoneyDto(amount.major, amount.minor, domain.getCurrency());
    }
}
