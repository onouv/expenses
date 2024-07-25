package onosoft.adapters.driven.account;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.ErrorDto;
import onosoft.ports.driven.account.AccountException;
import onosoft.ports.driven.account.NoSuchAccountException;

@Provider
public class AccountDefaultHandler implements ExceptionMapper<AccountException> {

    @Override
    public Response toResponse(AccountException exc) {
        ErrorDto dto = new ErrorDto(exc.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}