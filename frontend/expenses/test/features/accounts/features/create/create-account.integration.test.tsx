import { beforeEach, describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import CreateAccountForm from "../../../../../features/accounts/features/create/components/CreateAccountForm";
import user from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

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
  it("Then it should have an enabled cancel button", () => {
    const button = screen.getByText("CANCEL");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  describe("When entering account data", () => {
    beforeEach(() => {
      const nameInput = screen.getByLabelText("Account No");
      user.type(nameInput, "1234");
    });

    it("Then it should show entered data", () => {
      expect(screen.getByText("1234")).toBeInTheDocument();
    });
  });
});
