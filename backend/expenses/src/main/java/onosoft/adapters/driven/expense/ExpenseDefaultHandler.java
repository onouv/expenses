package onosoft.adapters.driven.expense;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.ports.driven.expense.ExpenseException;

@Provider
public class ExpenseDefaultHandler implements ExceptionMapper<ExpenseException> {

    @Override
    public Response toResponse(ExpenseException exception) {
        ErrorDto dto = new ErrorDto(exception.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(dto)
                .build();
    }
}
