package online.onosoft.adapters.inbound;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/expenses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExpensesResource {

    @POST
    public Response addExpenseToAccount(ExpenseDto payload, String accountNo) {



    }
}
