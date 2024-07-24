package onosoft.adapters.inbound.account;

import onosoft.application.account.AccountsAppService;
import onosoft.domain.model.Account;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestResponse;


@Path("/accounts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountsEndpoint {

    @Inject
    AccountsAppService port;

    @POST
    @Path("/create")
    public RestResponse<AccountDto> createAccount(AccountMetaDto dto) {

            Account account = port.createAccount(dto.accountNo(), dto.name(), dto.description());
            return RestResponse.ok(AccountDto.of(account));

    }
}
