import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppRouterContextProviderMock } from "@/test/mocks/msw/AppRouterContextProviderMock";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import {
  testAccountHeader,
  testStandardFormButtonsDirty,
  testStandardFormButtonsPristine,
} from "@/test/form-test-utils";
import PaymentTypeE from "@/common/types/PaymentTypeE";
import CurrencyE from "@/common/types/CurrencyE";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import {
  enterExpenseData,
  ExpenseDataControls,
  findFormDataControls,
} from "@/test/features/expenses/expense-test-utils";
import config from "@/app-config.json";

describe("Assign Expense - happy cases", () => {
  describe("Given an account without expenses", () => {
    const account: AccountDetailsT = {
      accountNo: "1234",
      accountName: "Business Support",
      accountDescription: "Bribes, protection money, etc.",
      expenses: [],
    };

    describe("When opening the assign expense form", () => {
      const today = new Date().toLocaleDateString();

      beforeEach(async () => {
        render(
          <AppRouterContextProviderMock>
            <AssignExpenseForm account={account} />
          </AppRouterContextProviderMock>,
        );
      });

      testAccountHeader(account);
      testStandardFormButtonsPristine();

      it("Then it should show recipient field empty", async () => {
        const recipient = await screen.findByLabelText(/recipient/i);
        expect(recipient).toBeInTheDocument();
        expect(recipient).toHaveValue("");
      });

      it("Then it should show purpose field empty", async () => {
        const purpose = await screen.findByLabelText(/purpose/i);
        expect(purpose).toBeInTheDocument();
        expect(purpose).toHaveValue("");
      });

      it("Then it should show accrued date as today", async () => {
        const dateAccrued = await screen.findByLabelText(/accrued/i);
        expect(dateAccrued).toHaveValue(today);
      });

      it("Then it should show amount as 0.00 EUR", async () => {
        const amount = await screen.findByLabelText(/amount/i);
        //const currency = await screen.findByTestId("currency-select-testid");
        const currency = await screen.findByText(CurrencyE.EUR);
        expect(amount).toHaveValue("0.00");
        expect(currency).toBeInTheDocument();
      });

      it("Then it should not require invoice", async () => {
        const withInvoice = await screen.findByRole("checkbox");
        const uploadInvoice = await screen.findByRole("button", {
          name: /invoice/i,
        });
        expect(withInvoice).not.toBeChecked();
        expect(uploadInvoice).toBeDisabled();
      });

      it("Then it should show payment of unknown type for today", async () => {
        const paymentDate = await screen.findByLabelText(/payment date/i);
        const paymentType = await screen.findByText(PaymentTypeE.Unknown);
        expect(paymentDate).toHaveValue(today);
        expect(paymentType).toBeInTheDocument();
      });

      it("Then it should allow receipt upload", async () => {
        const uploadReceipt = await screen.findByRole("button", {
          name: /receipt/i,
        });
        expect(uploadReceipt).toBeEnabled();
      });
    });

    describe("And given expense data", () => {
      const expenseData: PlannedExpenseT = {
        accountNo: account.accountNo,
        recipient: "Mobsters Inc.",
        purpose: "Protection services rendered",
        amount: {
          value: "3455,27",
          currency: CurrencyE.EUR,
        },
        accruedDate: new Date(),
        isInvoiced: true,
        paymentDate: new Date(),
        paymentType: PaymentTypeE.Cash,
      };
      describe("When opening the assign expense form", () => {
        beforeEach(async () => {
          render(
            <AppRouterContextProviderMock>
              <AssignExpenseForm account={account} />
            </AppRouterContextProviderMock>,
          );
        });

        describe("And when entering the expense", async () => {
          let controls: ExpenseDataControls;
          beforeEach(async () => {
            controls = await findFormDataControls();
            await enterExpenseData(expenseData, controls);
          });

          testStandardFormButtonsDirty();

          it("Then it should show the correct expense data", () => {
            expect(controls.recipient).toHaveValue(expenseData.recipient);
            expect(controls.purpose).toHaveValue(expenseData.purpose);
          });

          describe.todo("And when saving the data", () => {
            const url = config.backend.expenses.assign;
          });
        });
      });
    });
  });
});

describe.todo("Assign Expense - error cases", () => {});
