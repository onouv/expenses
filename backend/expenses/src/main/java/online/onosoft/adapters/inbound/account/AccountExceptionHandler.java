package online.onosoft.adapters.inbound.account;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import online.onosoft.adapters.inbound.ErrorDto;
import online.onosoft.usecases.AccountException;

@Provider
public class AccountExceptionHandler implements ExceptionMapper<AccountException> {

    @Override
    public Response toResponse(AccountException exc) {
        ErrorDto dto = new ErrorDto(exc.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }

}
