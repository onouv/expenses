import AccountT from "@/features/account/types/AccountT";
import config from "@/app-config.json";
import fetcher from "@/common/api/fetcher";
import useSWR, { SWRResponse } from "swr";

const url = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_PARTIAL_URL;

export default function useGetAccounts(): SWRResponse<AccountT[]> {
  return useSWR<AccountT[]>(url, fetcher);
}
