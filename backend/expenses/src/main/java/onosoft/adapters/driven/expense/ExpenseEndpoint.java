package onosoft.adapters.driven.expense;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import onosoft.adapters.driven.expense.dto.InvoicedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseResponseDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import org.jboss.logging.Logger;

@Path("/expenses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExpenseEndpoint {

    private static final Logger log = Logger.getLogger(ExpenseEndpoint.class);

    @Inject
    private ExpenseApiPort expenseService;

    @POST
    @Path("/expense/assign")
    public Response assignExpenseToAccount(PlannedExpenseDto request)
            throws AmountExceedsRangeException {

        log.infof("Request to assign expense to account: %s", request);

        PlannedExpenseResponseDto dto = expenseService.assignExpenseToAccount(request);

        return Response.ok(dto).build();
    }

    @POST
    @Path("/expense/invoice")
    public Response addInvoiceToExpense(InvoicedExpenseDto request) {
        log.infof("Request to add invoice to expense: %s", request.getExpenseId());
        log.errorf("not implemented, returning internal server error.");
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @DELETE
    @Path("/expense/delete/{expenseId}")
    public Response deleteExpense(long expenseId) {
        log.infof("Request to delete expense: %d", expenseId);
        this.expenseService.deleteExpense(expenseId);
        return Response.ok().build();
    }
}
