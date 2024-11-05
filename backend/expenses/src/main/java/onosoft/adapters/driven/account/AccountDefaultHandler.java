package onosoft.adapters.driven.account;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.ports.driven.account.AccountException;
import org.jboss.logging.Logger;

@Provider
public class AccountDefaultHandler implements ExceptionMapper<AccountException> {

    private static final Logger log = Logger.getLogger(AccountDefaultHandler.class);

    @Override
    public Response toResponse(AccountException exc) {

        log.error(exc.getMessage());

        ErrorDto dto = new ErrorDto(exc.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}
