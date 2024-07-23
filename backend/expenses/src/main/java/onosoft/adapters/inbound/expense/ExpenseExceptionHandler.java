package onosoft.adapters.inbound.expense;

import onosoft.adapters.inbound.ErrorDto;
import onosoft.usecases.ExpenseException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExpenseExceptionHandler implements ExceptionMapper<ExpenseException> {

    @Override
    public Response toResponse(ExpenseException exception) {
        ErrorDto dto = new ErrorDto(exception.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}
