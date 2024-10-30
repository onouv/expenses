package onosoft.application.commons.money;

import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.domain.model.Currency;

public class MoneyApiMapper {
    public static CappedMoney dtoToDomain(MoneyDto dto) throws AmountExceedsRangeException {
        final Currency currency = dto.currency();

        return new CappedMoney(
                new Money.Value(dto.amountMajor(),dto.amountMinor()),
                currency);
    }

    public static MoneyDto domainToDto(Money domain) {
        final Money.Value amount = domain.getValue();

        return new MoneyDto(amount.major, amount.minor, domain.getCurrency());
    }
}
