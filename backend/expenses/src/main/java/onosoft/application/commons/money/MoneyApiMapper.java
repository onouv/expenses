package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.domain.model.CappedMoney;
import onosoft.domain.model.Currency;
import onosoft.domain.model.Money;
import onosoft.domain.services.MoneyConfigService;
import org.jboss.logging.Logger;

@ApplicationScoped
public class MoneyApiMapper {
    private static final Logger log = Logger.getLogger(MoneyApiMapper.class);


    @Inject
    protected MoneyConfigService moneyConfigService;

    protected final String moneyFormat = "((^([1-9](\\d{0,2}))(,\\d{3})*)(\\.\\d{1,2})?)|0(\\.\\d{1,2})?";
            //"((^([1-9](\\d{0,2})))(\\.\\d{1,2})?)|0(\\.\\d{1,2})?";//"/((^([1-9](\\d{0,2}))(,\\d{3})*)(\\.\\d{1,2})?)|0(\\.\\d{1,2})?/g";
    protected String errorMsg(String amount) {
        return String.format("amount %s is not a valid money format", amount);
    }

    public CappedMoney dtoToDomain(MoneyDto dto) throws AmountExceedsRangeException, NumberFormatException {
        final Currency currency = dto.currency();
        final Money.Value value = parseAmount(dto.value());

        return new CappedMoney(value, currency, moneyConfigService.getUnitsLimit());
    }

    public MoneyDto domainToDto(Money domain) {
        final Money.Value value = domain.getValue();
        return new MoneyDto(value.toString(), domain.getCurrency());
    }

    // TODO: reliably parse money value: Locale, edge cases
    protected Money.Value parseAmount(String amount) {

        if(!amount.matches(moneyFormat)) {
            throw new NumberFormatException(errorMsg(amount));
        }

        String cleaned = amount.replaceAll(",", "");

        final String[] amountStrs = cleaned.split("\\.");

        if(amountStrs.length == 1) {
            final long major = Long.parseLong(amountStrs[0]);

            return new Money.Value(major, 0);
        }

        if (amountStrs.length == 2) {
            final long major = Long.parseLong(amountStrs[0]);
            final int minor = Integer.parseInt(amountStrs[1]);

            return new Money.Value(major, minor);
        }

        throw new NumberFormatException(errorMsg(String.format("%s.%s",amountStrs[0], amountStrs[1])));

    }
}
