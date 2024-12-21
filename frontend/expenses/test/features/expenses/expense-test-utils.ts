import ExpenseFormDataT from "@/features/expenses/types/ExpenseFormDataT";
import user, { userEvent } from "@testing-library/user-event";
import {
  act,
  getByRole,
  getByText,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import PaymentTypeE from "@/common/types/PaymentTypeE";
import { ExpenseDto } from "@/features/expenses/features/assign/api/ExpenseDto";

export type ExpenseDataControls = {
  recipient: HTMLElement | undefined;
  purpose: HTMLElement | undefined;
  dateAccrued: HTMLElement | undefined;
  // TODO: figure out how to enter a value for amount in testing
  //amount: HTMLElement | undefined;
  //currency: HTMLElement | undefined;
  withInvoice: HTMLElement | undefined;
  uploadInvoice: HTMLElement | undefined;
  paymentTargetDate: HTMLElement | undefined;
  paymentType: HTMLElement | undefined;
  uploadReceipt: HTMLElement | undefined;
};

export const findFormDataControls = async (): Promise<ExpenseDataControls> => ({
  recipient: await screen.findByLabelText(/recipient/i),
  purpose: await screen.findByLabelText(/purpose/i),
  dateAccrued: await screen.findByLabelText(/accrued/i),
  // TODO: figure out how to enter a value for amount in testing
  //amount: await screen.findByTestId("money-value-input"),
  //currency: await screen.findByText(CurrencyE.EUR),
  withInvoice: await screen.findByRole("checkbox"),
  uploadInvoice: await screen.findByRole("button", {
    name: /invoice/i,
  }),
  paymentTargetDate: await screen.findByLabelText(/payment date/i),
  paymentType: await screen.findByTestId("payment-type-select"),
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
  expense: ExpenseDto.Type,
  controls: ExpenseDataControls,
) => {
  if (controls.recipient)
    await user.type(controls.recipient, expense.recipient);
  if (controls.purpose) await user.type(controls.purpose, expense.purpose);
  // TODO: figure out how to enter a value for amount in testing
  /*
  if (controls.amount) {
    await enterAmount(controls.amount, expense.amount.value);
  }
   */
  if (controls.dateAccrued)
    await user.type(controls.dateAccrued, expense.accruedDate);
  if (controls.withInvoice && expense.isInvoiced)
    await user.click(controls.withInvoice);
  if (controls.paymentTargetDate)
    await user.type(controls.paymentTargetDate, expense.paymentTargetDate);

  // TODO : select any valid value in the paymentType <Select> control. This does NOT work:
  /*
  if (controls.paymentType && expense.paymentType) {
    await userEvent.click(controls.paymentType);
    const paymentType = await screen.findByText(expense.paymentType);
    await userEvent.click(paymentType);
  }
   */
};
