import config from "@/app-config.json";
import AccountT from "@/features/accounts/types/AccountT";

export const detailsUrlPartial = (accountNo: string): string => {
  return `${config.frontend.accounts.details}?accountno=${accountNo}`;
};
