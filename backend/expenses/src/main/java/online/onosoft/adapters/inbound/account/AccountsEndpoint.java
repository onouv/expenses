package online.onosoft.adapters.inbound.account;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import online.onosoft.application.AccountsInputPort;
import online.onosoft.domain.model.Account;
import org.jboss.resteasy.reactive.RestResponse;

@Path("/accounts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountsEndpoint {

    @Inject
    AccountsInputPort port;

    @POST
    @Path("/create")
    public RestResponse<AccountDto> createAccount(AccountMetaDto dto) {

            Account account = port.createAccount(dto.accountNo(), dto.name(), dto.description());
            return RestResponse.ok(AccountDto.of(account));

    }
}
