package onosoft.adapters.driven.account;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import onosoft.application.account.AccountApiMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driving.AccountData;
import onosoft.ports.driving.AccountRepoPort;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;


@Path("/account")
public class AccountsEndpoint {

    @Inject
    AccountApiPort port;

    @Inject
    AccountRepoPort repo;

    @Inject
    AccountApiMapper apiMapper;

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse<AccountDto> createAccount(AccountMetaDto dto) {

            Account account = this.port.createAccount(dto.accountNo(), dto.accountName(), dto.accountDescription());
            return RestResponse.ok(AccountDto.of(account));

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<AccountDto>> getAccounts() {
        List<AccountData> accounts = this.repo.listAll();
        List<AccountDto> payload = apiMapper.dtoListFromDOList(accounts);
        return RestResponse.ok(payload);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{accountNo}")
    public RestResponse<AccountDto> getAccount(String accountNo) {
        AccountData dO = this.repo.findDOByAccountNo(accountNo);
        AccountDto payload = this.apiMapper.dtoFromDO(dO);

        return RestResponse.ok(payload);
    }

}
