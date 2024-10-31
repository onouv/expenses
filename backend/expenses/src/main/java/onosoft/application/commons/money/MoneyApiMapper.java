package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.domain.model.CappedMoney;
import onosoft.domain.model.Currency;
import onosoft.domain.model.Money;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class MoneyApiMapper {

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long unitsLimit;

    public CappedMoney dtoToDomain(MoneyDto dto) throws AmountExceedsRangeException {
        final Currency currency = dto.currency();

        return new CappedMoney(
                new Money.Value(dto.amountMajor(),dto.amountMinor()),
                currency,
                unitsLimit);
    }

    public MoneyDto domainToDto(Money domain) {
        final Money.Value amount = domain.getValue();

        return new MoneyDto(amount.major, amount.minor, domain.getCurrency());
    }
}
