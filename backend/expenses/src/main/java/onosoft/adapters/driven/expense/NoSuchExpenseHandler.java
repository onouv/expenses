package onosoft.adapters.driven.expense;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import onosoft.adapters.driven.commons.error.ErrorDto;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import org.jboss.logging.Logger;

@Provider
public class NoSuchExpenseHandler implements ExceptionMapper<NoSuchExpenseException> {

    public static final Logger log = Logger.getLogger(NoSuchExpenseHandler.class);

    @Override
    public Response toResponse(NoSuchExpenseException e) {

        log.error(e.getMessage());

        ErrorDto dto = new ErrorDto(e.getMessage());

        return Response.status(Response.Status.NOT_FOUND)
                .entity(dto)
                .build();
    }
}
