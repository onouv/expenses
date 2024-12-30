import config from "@/app-config.json";

export const accountDetailsUrl = (accountNo: string): string => {
  return `${config.frontend.accounts.details}?accountno=${accountNo}`;
};
