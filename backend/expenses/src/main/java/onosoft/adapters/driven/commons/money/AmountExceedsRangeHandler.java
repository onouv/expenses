package onosoft.adapters.driven.commons.money;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import org.jboss.logging.Logger;

@Provider
public class AmountExceedsRangeHandler implements ExceptionMapper<AmountExceedsRangeException> {

    private static final Logger log = Logger.getLogger(AmountExceedsRangeHandler.class);


    @Override
    public Response toResponse(AmountExceedsRangeException e) {

        log.error(e.getMessage());

        ErrorDto dto = new ErrorDto(e.getMessage());

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(dto)
                .build();
    }
}
