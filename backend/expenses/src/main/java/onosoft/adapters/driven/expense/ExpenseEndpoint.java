package onosoft.adapters.driven.expense;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import onosoft.adapters.driven.account.AccountDto;
import onosoft.application.expense.ExpenseAppService;
import onosoft.application.expense.MoneyDataMapper;

@Path("/expenses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExpenseEndpoint {

    @Inject
    private ExpenseAppService expenseService;
    @Inject MoneyDataMapper moneyDataMapper;

    @POST
    public Response addExpenseToAccount(PlannedExpenseDto request) {
        PlannedExpenseResponseDto dto = expenseService.assignExpenseToAccount(
                request.getAccountNo(),
                request.getPurpose(),
                moneyDataMapper.dtoToDomain(request.getAmount()));

        return Response.ok(dto).build();
    }

    @POST
    public Response addInvoiceToExpense(InvoicedExpenseDto request) {

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
