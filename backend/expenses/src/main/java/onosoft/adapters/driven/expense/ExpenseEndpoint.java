package onosoft.adapters.driven.expense;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import onosoft.adapters.driven.expense.dto.AssignExpenseRequestDto;
import onosoft.adapters.driven.expense.dto.DeleteExpenseListRequestDto;
import onosoft.adapters.driven.expense.dto.ExpenseEntityDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.exception.ExpensePreexistingException;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import onosoft.ports.driven.expense.NoSuchExpenseException;
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
    public Response assignExpenseToAccount(AssignExpenseRequestDto request)
            throws NoSuchAccountException, AmountExceedsRangeException, ExpensePreexistingException {

        log.infof("Request to assign expense to account: %s", request);

        expenseService.assignExpenseToAccount(request);

        return Response.ok().build();
    }

    @PATCH
    @Path("/expense/update")
    public Response updateExpense(ExpenseEntityDto dto)
        throws NoSuchExpenseException, AmountExceedsRangeException, NoSuchAccountException {
        log.infof("Request to update expense: %s", dto);

        expenseService.updateExpenseEntity(dto);

        return Response.status(Response.Status.OK).build();
    }

    @GET
    @Path("/expense/details/{expenseId}")
    public Response getExpenseDetails(Long expenseId) throws
            NoSuchAccountException, AmountExceedsRangeException, NoSuchExpenseException {
        log.infof("Request to get expense details for: %s", expenseId);
        final ExpenseEntityDto expense = expenseService.getExpense(expenseId);

        return Response.ok(expense).build();
    }

    @POST
    @Path("/expense/invoice")
    public Response addInvoiceToExpense(ExpenseEntityDto request) {
        log.infof("Request to add invoice to expense: %s", request.getExpenseId());
        log.errorf("not implemented, returning internal server error.");
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @DELETE
    @Path("/expense/delete")
    public Response deleteExpenseList(DeleteExpenseListRequestDto dto) throws NoSuchExpenseException {
        log.infof("Request to delete %d expenses", dto.expenseIds().size());
        this.expenseService.deleteExpenseList(dto.expenseIds());
        return Response.ok().build();
    }
}
