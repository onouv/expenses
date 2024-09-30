package onosoft.ports.driving.commons.money;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import onosoft.domain.model.Currency;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Embeddable
public class MoneyData {

    @NotEmpty
    @Column(name="money_micro_units")
    private long microUnits;

    /*
    @NonNull
    @NotEmpty
    @Column(name="money_scale")
    private short scale;
     */

    @NotEmpty
    @Length(max=16)
    @Column(name="money_currency", length=3)
    @Enumerated(EnumType.STRING)
    Currency currency;
}
