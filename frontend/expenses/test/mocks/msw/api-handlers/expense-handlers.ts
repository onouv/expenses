import config from "@/app-config.json";
import { http, HttpHandler, HttpResponse } from "msw";
import { PlannedExpenseDto } from "@/features/expenses/features/assign/api/PlannedExpenseDtoT";
const backendUrl = config.backend.expenses.assign;
import _ from "lodash";

export const mockAssignExpenseApi = (
  expectedExpense: PlannedExpenseDto.Type,
  errorMessage: string,
): HttpHandler =>
  http.post(backendUrl, async ({ request }) => {
    const requestData =
      //(await request.json()) as PlannedExpenseDto.Type;
      await request.json();

    if (requestData) {
      // request.json() essentially returns a Record<..> which cannot be cast correctly to
      // our type, so the fields mess up and cannot be manually compared easily
      if (_.isEqual(expectedExpense, requestData)) {
        return new HttpResponse(null, { status: 200 });
      }
    }

    return HttpResponse.json(
      {
        errorId: self.crypto.randomUUID(),
        errorMessages: [errorMessage],
      },
      { status: 500 },
    );
  });
