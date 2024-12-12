import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import user, { userEvent } from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import CurrencyE from "@/common/types/CurrencyE";
import PaymentTypeE from "@/common/types/PaymentTypeE";

export type ExpenseDataControls = {
  recipient: HTMLElement | undefined;
  purpose: HTMLElement | undefined;
  dateAccrued: HTMLElement | undefined;
  amount: HTMLElement | undefined;
  currency: HTMLElement | undefined;
  withInvoice: HTMLElement | undefined;
  uploadInvoice: HTMLElement | undefined;
  paymentDate: HTMLElement | undefined;
  paymentType: HTMLElement | undefined;
  uploadReceipt: HTMLElement | undefined;
};

export const findFormDataControls = async (): Promise<ExpenseDataControls> => ({
  recipient: await screen.findByLabelText(/recipient/i),
  purpose: await screen.findByLabelText(/purpose/i),
  dateAccrued: await screen.findByLabelText(/accrued/i),
  amount: await screen.findByTestId("money-value-input"),
  currency: await screen.findByText(CurrencyE.EUR),
  withInvoice: await screen.findByRole("checkbox"),
  uploadInvoice: await screen.findByRole("button", {
    name: /invoice/i,
  }),
  paymentDate: await screen.findByLabelText(/payment date/i),
  paymentType: await screen.findByText(PaymentTypeE.Unknown),
  uploadReceipt: await screen.findByRole("button", {
    name: /receipt/i,
  }),
});

async function enterAmount(input: HTMLElement, amount: string) {
  await userEvent.click(input);
  const keyboardState = await userEvent.keyboard(
    "{Home}{Shift>}{End}{/Shift}1234",
  );
  /*for (let i = 0; i < amount.length; i++) {
    await user.keyboard(amount[i]);
  }

   */
}

export const enterExpenseData = async (
  expense: PlannedExpenseT,
  controls: ExpenseDataControls,
) => {
  if (controls.recipient)
    await user.type(controls.recipient, expense.recipient);
  if (controls.purpose) await user.type(controls.purpose, expense.purpose);
  if (controls.amount) {
    await enterAmount(controls.amount, expense.amount.value);
  }
  if (controls.dateAccrued)
    await user.type(
      controls.dateAccrued,
      expense.accruedDate.toLocaleDateString(),
    );
  if (controls.withInvoice && expense.isInvoiced)
    await user.click(controls.withInvoice);
  if (controls.paymentDate)
    await user.type(
      controls.paymentDate,
      expense.paymentDate.toLocaleDateString(),
    );
};
