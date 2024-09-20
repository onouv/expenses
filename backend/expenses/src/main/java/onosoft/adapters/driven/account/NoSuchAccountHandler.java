package onosoft.adapters.driven.account;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.ErrorDto;
import onosoft.ports.driven.account.NoSuchAccountException;

@Provider
public class NoSuchAccountHandler implements ExceptionMapper<NoSuchAccountException> {

    @Override
    public Response toResponse(NoSuchAccountException e) {
        ErrorDto dto = new ErrorDto(e.getMessage());

        return Response.status(Response.Status.NOT_FOUND).entity(dto).build();
    }
}
