import { expect, it, vi } from "vitest";
import AccountT from "@/features/accounts/types/AccountT";
import { screen } from "@testing-library/react";

export function testAccountHeader(account: AccountT) {
  it("Then it should show a header line for this account", async () => {
    const number = await screen.findByText(account.accountNo);
    expect(number).toBeInTheDocument();

    const name = await screen.findByText(account.accountName);
    expect(name).toBeInTheDocument();

    const description = await screen.findByText(account.accountName);
    expect(description).toBeInTheDocument();
  });
}

export function testStandardFormButtonsPristine() {
  it("Then it should have disabled reset button", async () => {
    const button = await screen.findByText(/reset/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Then it should have disabled save button", async () => {
    const button = await screen.getByText(/save/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Then it should have an enabled cancel button", async () => {
    const button = await screen.findByText(/cancel/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
}

export function testStandardFormButtonsDirty() {
  it("Then it should have enabled reset button", () => {
    const button = screen.getByText(/reset/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Then it should have enabled save button", () => {
    const button = screen.getByText(/save/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Then it should have an enabled cancel button", async () => {
    const button = await screen.findByText(/cancel/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
}
