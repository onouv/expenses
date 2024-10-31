package onosoft.domain.model;

import io.quarkus.runtime.annotations.StaticInitSafe;
import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;

@StaticInitSafe
@ConfigMapping(prefix = "domain")
public interface DomainConfig {
    interface Money {
        @WithDefault("100000")
        long maxValue();
    }
}
