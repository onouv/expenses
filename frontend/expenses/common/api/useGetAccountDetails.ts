import config from "@/app-config.json";
import fetcher from "@/common/api/fetcher";
import useSWR, { SWRResponse } from "swr";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";

const BASE_URL = config.backend.accounts.details;

export default function useGetAccountDetails(
  accountNo: string,
): SWRResponse<AccountDetailsT> {
  const url = BASE_URL + `/${accountNo}`;
  return useSWR<AccountDetailsT>(url, fetcher);
}
