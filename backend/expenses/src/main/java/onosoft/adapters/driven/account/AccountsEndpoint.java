package onosoft.adapters.driven.account;

import onosoft.adapters.driving.AccountData;
import onosoft.application.account.AccountsAppService;
import onosoft.domain.model.Account;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.ArrayList;
import java.util.List;


@Path("/account")
public class AccountsEndpoint {

    @Inject
    AccountsAppService port;

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse<AccountDto> createAccount(AccountMetaDto dto) {

            Account account = this.port.createAccount(dto.accountNo(), dto.name(), dto.description());
            return RestResponse.ok(AccountDto.of(account));

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<AccountDto>> getAccounts() {
        //List<AccountData> accounts = this.port.getAccounts().stream().flatMap(account -> TODO);
        List<AccountDto> accounts = new ArrayList<>();
        return RestResponse.ok(accounts);
    }

}
