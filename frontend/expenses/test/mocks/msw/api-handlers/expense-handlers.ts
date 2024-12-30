import config from "@/app-config.json";
import { http, HttpHandler, HttpResponse } from "msw";
import { ExpenseDto } from "@/features/expenses/features/assign/api/ExpenseDto";

import _ from "lodash";

export const mockAssignExpenseApi = (
  expectedExpense: ExpenseDto.Type,
  errorMessage: string,
): HttpHandler =>
  http.post(config.backend.expenses.assign, async ({ request }) => {
    const requestData =
      //(await request.json()) as PlannedExpenseDto.Type;
      await request.json();

    if (requestData) {
      const requestedExpense: ExpenseDto.Type = {
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

export const mockUpdateExpenseApi = (
  expectedExpense: ExpenseDto.Type,
  errorMessage: string,
): HttpHandler =>
  http.patch(config.backend.expenses.update, async ({ request }) => {});
