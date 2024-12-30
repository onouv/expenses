import { Account } from "@/features/accounts/types/Account";
import config from "@/app-config.json";
import fetcher from "@/common/api/fetcher";
import useSWR, { SWRResponse } from "swr";

const url = config.backend.accounts.default;

export default function useGetAccountsApi(): SWRResponse<Account.Type[]> {
  return useSWR<Account.Type[]>(url, fetcher);
}
