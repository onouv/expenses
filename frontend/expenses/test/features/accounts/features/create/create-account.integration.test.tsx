import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateAccountForm from "../../../../../features/accounts/features/create/components/CreateAccountForm";
import user from "@testing-library/user-event";
import config from "@/app-config.json";
import mockRouter from "../../../../mocks/mock-router";
import { act } from "react";

describe("Given create accounts form", () => {
  beforeEach(() => {
    render(<CreateAccountForm />);
  });
  /*
  it("Then it should have disabled save button", () => {
    const button = screen.getByText(/save/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
*/
  it("Then it should have an enabled cancel button", async () => {
    const button = await screen.findByText("CANCEL");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  describe("When entering valid account data", () => {
    beforeEach(async () => {
      const accountNoInput = await screen.findByLabelText("Account No");
      await user.type(accountNoInput, "1234");

      const nameInput = await screen.findByLabelText("Account Name");
      await user.type(nameInput, "Test Account");

      const descriptionInput = await screen.findByLabelText("Description");
      await user.type(descriptionInput, "It's for testing.");
    });

    it("Then it should show entered data", async () => {
      const accountNoInput = await screen.findByLabelText("Account No");
      expect(accountNoInput).toHaveValue("1234");

      const nameInput = await screen.findByLabelText("Account Name");
      expect(nameInput).toHaveValue("Test Account");

      const descriptionInput = await screen.findByLabelText("Description");
      expect(descriptionInput).toHaveValue("It's for testing.");
    });

    describe("When clicking SAVE", () => {
      const url =
        config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;

      /*
      const push = jest.fn();

      jest.mock("next/navigation", () => {
        return {
          useRouter: () => ({
            push,
          }),
        };
      });
       */

      beforeEach(async () => {
        const saveButton = await screen.findByText("SAVE");
        await act(() => fireEvent.click(saveButton));
      });

      it("Then it should call server with correct DTO", async () => {});

      describe("When request is pending", () => {
        it("Then it should show a waiting prompt", async () => {
          const prompt = await screen.findByText("Saving data to server...");
          expect(prompt).toBeInTheDocument();
        });

        describe("When server returns 201 Created", () => {
          it("Then it should route to details page for created account", () => {
            expect(mockRouter.push).toHaveBeenCalledWith(url);
          });
        });

        describe("When server returns an error (500)", () => {
          it("Then it should display the error message", () => {});

          describe("When user clicks OK", () => {
            it("Then it should route to details page for created account", () => {});
          });
        });
      });
    });
  });
});
