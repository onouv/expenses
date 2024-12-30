import { beforeEach, describe } from "vitest";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import { ExpenseEntity } from "@/features/expenses/types/ExpenseEntity";
import PaymentTypeE from "@/common/types/PaymentTypeE";
import PaymentStatusE from "@/common/types/PaymentStatusE";
import CurrencyE from "@/common/types/CurrencyE";
import { render } from "@testing-library/react";
import { AppRouterContextProviderMock } from "@/test/mocks/msw/AppRouterContextProviderMock";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import UpdateExpenseForm from "@/features/expenses/features/update/components/UpdateExpenseForm";
import {
  testAccountHeader,
  testStandardFormButtonsPristine,
} from "@/test/form-test-utils";

describe("Feature Update Expense", () => {
  describe("Given an account with expenses", () => {
    const expensesGiven: ExpenseEntity.Type[] = [
      {
        expenseId: 1,
        accountNo: "1234",
        recipient: "Mobsters Inc.",
        purpose: "Protection services rendered",
        amount: {
          value: "123.00",
          currency: CurrencyE.EUR,
        },
        accruedDate: new Date(),
        paymentTargetDate: new Date(),
        paymentActualDate: new Date(),
        paymentType: PaymentTypeE.Unknown,
        paymentStatus: PaymentStatusE.PLANNED,
        isInvoiced: false,
      },
    ];
    const accountGiven: AccountDetailsT = {
      accountNo: "1234",
      accountName: "Business Support",
      accountDescription: "Bribes, protection money, etc.",
      expenses: expensesGiven,
    };

    describe("When opening the update expense form", () => {
      beforeEach(async () => {
        render(
          <AppRouterContextProviderMock>
            <UpdateExpenseForm expense={expensesGiven[0]} />
          </AppRouterContextProviderMock>,
        );
      });

      testAccountHeader(accountGiven);
      testStandardFormButtonsPristine();
    });
  });
});
