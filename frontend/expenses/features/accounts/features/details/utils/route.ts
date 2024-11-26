import config from "@/app-config.json";
import AccountT from "@/features/accounts/types/AccountT";

export const detailsUrl = (account: AccountT): string => {
  return `${config.ACCOUNT_DETAILS_PARTIAL_URL}?accountno=${account.accountNo}`;
};
