package onosoft.adapters.driven.expense;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import onosoft.adapters.driven.expense.dto.InvoicedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseResponseDto;
import onosoft.application.expense.ExpenseAppService;
import onosoft.application.commons.money.AmountExceedsRangeException;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path("/expenses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExpenseEndpoint {

    @Inject
    private ExpenseAppService expenseService;

    @POST
    @Path("/create")
    public Response assignExpenseToAccount(PlannedExpenseDto request)
            throws AmountExceedsRangeException {
        PlannedExpenseResponseDto dto = expenseService.assignExpenseToAccount(request);

        return Response.ok(dto).build();
    }

    @POST
    @Path("/invoice")
    public Response addInvoiceToExpense(InvoicedExpenseDto request) {

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
