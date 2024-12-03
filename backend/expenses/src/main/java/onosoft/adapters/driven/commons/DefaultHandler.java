package onosoft.adapters.driven.commons;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import org.jboss.logging.Logger;

@Provider
public class DefaultHandler implements ExceptionMapper<Exception> {
    private static final Logger log = Logger.getLogger(DefaultHandler.class);

    @Override
    public Response toResponse(Exception exception) {
        log.error(exception.getMessage());

        ErrorDto dto = new ErrorDto("Unknown internal service error.");

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}
