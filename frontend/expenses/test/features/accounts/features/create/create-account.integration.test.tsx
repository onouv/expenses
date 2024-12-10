import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateAccountForm from "@/features/accounts/features/create/components/CreateAccountForm";
import user, { userEvent } from "@testing-library/user-event";
import config from "@/app-config.json";
import {
  AppRouterContextProviderMock,
  mockRouter,
} from "@/test/mocks/msw/AppRouterContextProviderMock";
import mockServer from "@/test/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { HttpStatusCode } from "axios";
import AccountT from "@/features/accounts/types/AccountT";
import {
  testStandardFormButtonsDirty,
  testStandardFormButtonsPristine,
} from "@/test/features/expenses/form-test-utils";

const enterAccountData = async (account: AccountT) => {
  const accountNoInput = await screen.findByLabelText("Account No");

  await user.type(accountNoInput, account.accountNo);

  const nameInput = await screen.findByLabelText("Account Name");
  await user.type(nameInput, account.accountName);

  const descriptionInput = await screen.findByLabelText("Description");
  await user.type(descriptionInput, account.accountDescription);
};

describe("Create Account - happy cases", () => {
  describe("Given valid account data", () => {
    const account: AccountT = {
      accountNo: "1234",
      accountName: "Business Support",
      accountDescription: "Bribes, protection money, etc.",
    };

    describe("When opening Create Account Form", () => {
      beforeEach(() => {
        render(
          <AppRouterContextProviderMock>
            <CreateAccountForm />
          </AppRouterContextProviderMock>,
        );
      });

      testStandardFormButtonsPristine();

      describe("When entering valid account data", () => {
        beforeEach(async () => {
          await enterAccountData(account);
        });

        it("Then it should show entered data", async () => {
          const accountNoInput = await screen.findByLabelText(/no|number/i);
          expect(accountNoInput).toHaveValue(account.accountNo);

          const nameInput = await screen.findByLabelText(/name/i);
          expect(nameInput).toHaveValue(account.accountName);

          const descriptionInput =
            await screen.findByLabelText(/descr.|description/i);
          expect(descriptionInput).toHaveValue(account.accountDescription);
        });

        testStandardFormButtonsDirty();

        describe("When user saves the data", () => {
          const url = config.ACCOUNTS_PARTIAL_URL;

          beforeEach(async () => {
            const saveButton = await screen.findByText(/save/i);
            await userEvent.click(saveButton);
            //fireEvent.click(saveButton);
          });

          it("Then it should route to account overview page", () => {
            expect(mockRouter.push).toHaveBeenCalledWith(url);
          });
        });
      });
    });
  });
});

describe("Create Account - failures", () => {
  describe("Given valid account data", () => {
    const account: AccountT = {
      accountNo: "1234",
      accountName: "Business Support",
      accountDescription: "Bribes, protection money, etc.",
    };

    describe("When user saves the data", () => {
      beforeEach(async () => {
        render(
          <AppRouterContextProviderMock>
            <CreateAccountForm />
          </AppRouterContextProviderMock>,
        );

        await enterAccountData(account);

        const postUrl =
          config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;
        mockServer.use(
          http.post(postUrl, async ({ request }) => {
            const dto = await request.json();
            //console.log(`POST ${postUrl}: ${dto} --> 500`);
            return HttpResponse.json(
              { errorMessages: ["A test error"] },
              {
                status: HttpStatusCode.InternalServerError,
                headers: {
                  "Content-type": "application/json;charset=UTF-8",
                },
              },
            );
          }),
        );

        const saveButton = await screen.findByText(/save/i);
        await userEvent.click(saveButton);
      });

      describe("When Server returns error", () => {
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
            await userEvent.click(okButton);
            //fireEvent.click(okButton);
          });
          //

          it("Then it should route to account overview page", () => {
            const route = config.ACCOUNTS_PARTIAL_URL;
            expect(mockRouter.push).toHaveBeenCalledWith(route);
          });
        });
      });
    });
  });
});
