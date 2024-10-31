package onosoft.adapters.driven.commons.money;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.application.commons.money.AmountExceedsRangeException;

@Provider
public class AmountExceedsRangeHandler implements ExceptionMapper<AmountExceedsRangeException> {

    @Override
    public Response toResponse(AmountExceedsRangeException e) {
        ErrorDto dto = new ErrorDto(e.getMessage());

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(dto)
                .build();
    }
}
