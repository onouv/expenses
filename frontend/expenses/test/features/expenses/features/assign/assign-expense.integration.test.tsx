import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  AppRouterContextProviderMock,
  mockRouter,
} from "@/test/mocks/msw/AppRouterContextProviderMock";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import {
  testAccountHeader,
  testStandardFormButtonsDirty,
  testStandardFormButtonsPristine,
} from "@/test/form-test-utils";
import PaymentTypeE from "@/common/types/PaymentTypeE";
import CurrencyE from "@/common/types/CurrencyE";
import {
  enterExpenseData,
  ExpenseDataControls,
  findFormDataControls,
} from "@/test/features/expenses/expense-test-utils";
import config from "@/app-config.json";
import user from "@testing-library/user-event";
import { mockAssignExpenseApi } from "@/test/mocks/msw/api-handlers/expense-handlers";
import mockServer from "@/test/mocks/msw/node";
import { PlannedExpenseDto } from "@/features/expenses/features/assign/api/PlannedExpenseDtoT";

describe("Feature Assign Expense", () => {
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
      const expenseData: PlannedExpenseDto.Type = {
        accountNo: account.accountNo,
        recipient: "Mobsters Inc.",
        purpose: "Protection services rendered",
        amount: {
          value: "0.00",
          currency: CurrencyE.EUR,
        },
        accruedDate: "12/14/2024",
        isInvoiced: true,
        paymentTargetDate: "01/14/2025",
        paymentType: PaymentTypeE.BankTransfer,
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
            // TODO: check other controls
            // TODO: figure out how to enter a value for amount
            //expect(controls.amount).toHaveValue("0.00");
          });

          describe("And when saving the data", () => {
            describe("And when server returns OK", () => {
              beforeEach(async () => {
                mockServer.use(
                  mockAssignExpenseApi(expenseData, "unexpected error!"),
                );
                const saveButton = await screen.findByText(/save/i);
                await user.click(saveButton);
              });

              it("Then it should route back to the account details page", () => {
                const frontendRoute = `${config.frontend.accounts.details}?accountno=${account.accountNo}`;
                expect(mockRouter.push).toHaveBeenCalledWith(frontendRoute);
              });
            });

            describe("And when server returns an error", () => {
              beforeEach(async () => {
                expenseData.accountNo = account.accountNo + `1`; // this will cause mocked server to reject with 500
                mockServer.use(
                  mockAssignExpenseApi(expenseData, "mocked error"),
                );

                const saveButton = await screen.findByText(/save/i);
                await user.click(saveButton);
              });

              it("Then it should display an error message", async () => {
                const errorText = await screen.findByText(/error/i);
                expect(errorText).toBeInTheDocument();
              });

              it("Then it should show an enabled OK button", async () => {
                const okButton = await screen.findByRole("button");
                expect(okButton).toBeEnabled();
              });

              describe("When user clicks OK", async () => {
                beforeEach(async () => {
                  const okButton = await screen.findByRole("button");
                  await user.click(okButton);
                });

                it("Then it should route to account details page", () => {
                  const route = config.frontend.accounts.details;
                  expect(mockRouter.push).toHaveBeenCalledWith(route);
                });
              });
            });
          });
        });
      });
    });
  });
});

describe.todo("Assign Expense - error cases", () => {});
