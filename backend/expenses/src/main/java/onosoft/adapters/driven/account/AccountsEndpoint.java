package onosoft.adapters.driven.account;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import onosoft.application.account.AccountApiMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;


@Path("/account")
public class AccountsEndpoint {

    @Inject
    AccountApiPort port;

    @Inject
    AccountRepoPort repo;

    @Inject
    AccountApiMapper accountApiMapper;

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse<Void> createAccount(AccountMetaDto dto) {
            Account account = this.port.createAccount(
                    dto.getAccountNo(),
                    dto.getAccountName(),
                    dto.getAccountDescription());
            return RestResponse.ok();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<AccountMetaDto>> getAccounts()  throws AmountExceedsRangeException {
        List<AccountData> data = this.repo.listAll();
        List<AccountMetaDto> payload = AccountApiMapper.dtoListFromDataList(data);
        return RestResponse.ok(payload);
    }

    @GET
    @Path("/{accountNo}")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<AccountDto> getAccount(String accountNo) throws AmountExceedsRangeException {
        AccountData data = this.repo.findDOByAccountNo(accountNo);
        AccountDto payload = accountApiMapper.dtoFromData(data);

        return RestResponse.ok(payload);
    }

}
