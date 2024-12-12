import PlannedExpenseT, {
  equals,
} from "@/features/expenses/types/PlannedExpenseT";
import config from "@/app-config.json";
import { http, HttpHandler, HttpResponse } from "msw";
const backendUrl = config.backend.expenses.assign;

export const mockAssignExpenseApi = (
  expectedExpense: PlannedExpenseT,
  errorMessage: string,
): HttpHandler =>
  http.post(backendUrl, async ({ request }) => {
    const requestData: PlannedExpenseT | undefined =
      (await request.json()) as PlannedExpenseT;
    if (requestData && equals(requestData, expectedExpense)) {
      return new HttpResponse(null, { status: 200 });
    }

    return HttpResponse.json(
      {
        errorId: self.crypto.randomUUID(),
        errorMessages: [errorMessage],
      },
      { status: 500 },
    );
  });
