package onosoft.adapters.driven.expense;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/expenses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExpenseEndpoint {

    @POST
    public Response addExpenseToAccount(AssignExpenseRequestDto requestDto) {
        return Response.ok().build();
    }
}
