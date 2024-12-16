import config from "@/app-config.json";
import { http, HttpHandler, HttpResponse } from "msw";
import { PlannedExpenseDto } from "@/features/expenses/features/assign/api/PlannedExpenseDto";
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
      const requestedExpense: PlannedExpenseDto.Type = {
        // @ts-ignore
        ...requestData,
      };

      requestedExpense.paymentTargetDate = new Date(
        requestedExpense.paymentTargetDate,
      ).toLocaleDateString();
      requestedExpense.accruedDate = new Date(
        requestedExpense.accruedDate,
      ).toLocaleDateString();

      if (_.isEqual(expectedExpense, requestedExpense)) {
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
