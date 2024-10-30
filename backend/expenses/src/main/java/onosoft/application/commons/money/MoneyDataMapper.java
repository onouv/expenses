package onosoft.application.commons.money;

import onosoft.ports.driving.commons.money.MoneyData;

public class MoneyDataMapper {

    public static CappedMoney dataToDomain(MoneyData data) throws AmountExceedsRangeException {
        return new CappedMoney(
                data.getMicroUnits(),
                data.getCurrency());
    }

    public static MoneyData domainToData(Money domain) {
        return new MoneyData(
                domain.microUnits,
                domain.currency
        );
    }

}
