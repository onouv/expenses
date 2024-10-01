package onosoft.adapters.driven.expense;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.domain.exception.ExpensePreexistingException;

@Provider
public class ExpensePreexistingExceptionHandler
        implements ExceptionMapper<ExpensePreexistingException> {
    @Override
    public Response toResponse(ExpensePreexistingException exception) {
        ErrorDto dto = new ErrorDto(exception.getMessage());

        return Response.status(Response.Status.CONFLICT)
                .entity(dto)
                .build();
    }
}
