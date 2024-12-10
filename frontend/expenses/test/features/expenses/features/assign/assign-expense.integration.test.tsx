import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppRouterContextProviderMock } from "@/test/mocks/msw/AppRouterContextProviderMock";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import {
  testAccountHeader,
  testStandardFormButtonsPristine,
} from "@/test/features/expenses/form-test-utils";
import PaymentTypeE from "@/common/types/PaymentTypeE";

//beforeEach(async () => {});

//describe("", () => {});

describe("Assign Expense - happy cases", () => {
  describe("Given an account without expenses", () => {
    const account: AccountDetailsT = {
      accountNo: "1234",
      accountName: "Business Support",
      accountDescription: "Bribes, protection money, etc.",
      expenses: [],
    };

    describe("When opening the assign expense form", () => {
      beforeEach(async () => {
        render(
          <AppRouterContextProviderMock>
            <AssignExpenseForm account={account} />
          </AppRouterContextProviderMock>,
        );
      });

      testAccountHeader(account);
      testStandardFormButtonsPristine();

      it("Then it should render an empty form for this account", async () => {
        const recipient = await screen.findByLabelText(/recipient/i);
        const purpose = await screen.findByLabelText(/purpose/i);

        const today = new Date().toLocaleDateString();
        const dateAccrued = await screen.findByLabelText(/accrued/i);
        const amount = await screen.findByLabelText(/amount/i);
        const withInvoice = await screen.findByRole("checkbox");
        const paymentDate = await screen.findByLabelText(/payment date/i);
        const paymentType = await screen.findByText(PaymentTypeE.Unknown);

        expect(recipient).toBeInTheDocument();
        expect(purpose).toBeInTheDocument();
        expect(dateAccrued).toHaveValue(today);
        expect(amount).toHaveValue("0.00");
        expect(withInvoice).not.toBeChecked();
        expect(paymentDate).toHaveValue(today);
        expect(paymentType).toBeInTheDocument();
      });
    });
  });
});

describe.todo("Assign Expense - error cases", () => {});
