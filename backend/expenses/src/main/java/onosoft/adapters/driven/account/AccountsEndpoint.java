package onosoft.adapters.driven.account;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import onosoft.application.account.AccountApiMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountRepoPort;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.ArrayList;
import java.util.List;


@Path("/accounts")
public class AccountsEndpoint {

    private static final Logger log = Logger.getLogger(AccountsEndpoint.class);

    @Inject
    AccountApiPort port;

    @Inject
    AccountRepoPort repo;

    @Inject
    AccountApiMapper accountApiMapper;

    @POST
    @Path("/account/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse<Void> createAccount(AccountMetaDto dto)
            throws DuplicateAccountNoException, AmountExceedsRangeException {
            log.infof("request to create account: %s", dto);
            Account account = this.port.createAccount(
                    dto.getAccountNo(),
                    dto.getAccountName(),
                    dto.getAccountDescription());

            log.infof("Created account %s", account);
            return RestResponse.ok();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<AccountMetaDto>> getAccounts() throws AmountExceedsRangeException {
        log.info("request to get accounts");
        List<Account> data = this.repo.loadAllAccounts();
        List<AccountMetaDto> payload = new ArrayList<>();
        data.forEach(account -> {
            payload.add(this.accountApiMapper.dtoFromDomain(account));
        });

        return RestResponse.ok(payload);
    }

    @GET
    @Path("account/details/{accountNo}")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<AccountDto> getAccount(String accountNo)
            throws NoSuchAccountException, AmountExceedsRangeException {
        log.infof("request to get details for account %s", accountNo);

        AccountDto payload = accountApiMapper.dtoFromDomain(this.repo.loadAccount(accountNo));

        return RestResponse.ok(payload);
    }

}
