import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import config from "@/app-config.json";
import { http, HttpHandler, HttpResponse } from "msw";
const backendUrl = config.backend.expenses.assign;

function datesEqual(a: Date, b: Date): boolean {
  return (
    a.getDate() == b.getDate() &&
    a.getMonth() == b.getMonth() &&
    a.getFullYear() == b.getFullYear()
  );
}
export function equals(left: PlannedExpenseT, right: PlannedExpenseT): boolean {
  const isEqual =
    left.accountNo == right.accountNo &&
    left.recipient == right.recipient &&
    left.purpose == right.purpose &&
    // TODO: figure out how to enter a value for amount in testing
    //left.amount.value == right.amount.value &&
    left.amount.currency == right.amount.currency &&
    left.paymentType == right.paymentType;

  const datesAreEqual =
    datesEqual(left.accruedDate, right.accruedDate) &&
    datesEqual(left.paymentDate, right.paymentDate);

  return isEqual && datesAreEqual;
}

export const mockAssignExpenseApi = (
  expectedExpense: PlannedExpenseT,
  errorMessage: string,
): HttpHandler =>
  http.post(backendUrl, async ({ request }) => {
    const requestData: PlannedExpenseT | undefined =
      (await request.json()) as PlannedExpenseT;

    if (requestData) {
      if (equals(requestData, expectedExpense)) {
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
