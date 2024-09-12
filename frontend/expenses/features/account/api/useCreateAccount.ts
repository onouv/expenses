import config from '@/app-config.json';
import useSWR, {SWRResponse} from "swr";
import AccountT from "@/features/account/types/AccountT";
import fetcher from "@/common/api/fetcher";

const url = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;

export default function useCreateAccount(): SWRResponse<AccountT> {
    return useSWR<AccountT>(url, fetcher);
}