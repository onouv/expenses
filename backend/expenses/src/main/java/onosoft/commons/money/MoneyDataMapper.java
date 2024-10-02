package onosoft.commons.money;

import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.commons.money.Money;
import onosoft.ports.driving.commons.money.MoneyData;

import java.util.List;

public class MoneyDataMapper {

    public static Money dataToDomain(MoneyData data) throws AmountExceedsRangeException {
        return new Money(
                data.getMicroUnits(),
                data.getCurrency());
    }

    //MoneyData domainToData(Money domain);

}
