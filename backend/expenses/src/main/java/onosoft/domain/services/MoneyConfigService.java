package onosoft.domain.services;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.Getter;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

@ApplicationScoped
@Getter
public class MoneyConfigService {
    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long unitsLimit;

    private static final Logger log = Logger.getLogger(MoneyConfigService.class);

    MoneyConfigService() {
        log.infof("MoneyConfigService created. unitsLimit: %d", unitsLimit);
    }
}
