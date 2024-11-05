package onosoft.adapters.driven.account;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.ports.driven.account.NoSuchAccountException;
import org.jboss.logging.Logger;

@Provider
public class NoSuchAccountHandler implements ExceptionMapper<NoSuchAccountException> {

    private static final Logger log = Logger.getLogger(NoSuchAccountHandler.class);

    @Override
    public Response toResponse(NoSuchAccountException e) {

        log.error(e.getMessage());

        ErrorDto dto = new ErrorDto(e.getMessage());

        return Response.status(Response.Status.NOT_FOUND).entity(dto).build();
    }
}
