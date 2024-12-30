import AccountT from "@/features/accounts/types/AccountT";
import config from "@/app-config.json";
import fetcher from "@/common/api/fetcher";
import useSWR, { SWRResponse } from "swr";

const url = config.backend.accounts.default;

export default function useGetAccountsApi(): SWRResponse<AccountT[]> {
  return useSWR<AccountT[]>(url, fetcher);
}
