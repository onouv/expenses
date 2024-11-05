package onosoft.adapters.driven.expense;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.domain.exception.ExpensePreexistingException;
import org.jboss.logging.Logger;

@Provider
public class ExpensePreexistingExceptionHandler
        implements ExceptionMapper<ExpensePreexistingException> {

    private static final Logger log = Logger.getLogger(ExpensePreexistingExceptionHandler.class);

    @Override
    public Response toResponse(ExpensePreexistingException exception) {

        log.error(exception.getMessage());

        ErrorDto dto = new ErrorDto(exception.getMessage());

        return Response.status(Response.Status.CONFLICT)
                .entity(dto)
                .build();
    }
}
