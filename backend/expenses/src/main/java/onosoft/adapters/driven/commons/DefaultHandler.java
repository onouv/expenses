package onosoft.adapters.driven.commons;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;

@Provider
public class DefaultHandler implements ExceptionMapper<Exception> {
    @Override
    public Response toResponse(Exception exception) {
        System.out.println(exception.getMessage());

        ErrorDto dto = new ErrorDto("Unknown internal error of expenses service.");

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}
