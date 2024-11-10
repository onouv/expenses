"use client";

import AccountT from "@/features/accounts/types/AccountT";
import { useCallback, useState } from "react";
import axios from "axios";
import config from "@/app-config.json";

const url = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;

type PostCall<T> = (data: T) => void;
//type PostResponse<T> = SWRResponse<T> & { postCall: PostCall<T> };
type PostResponse<T> = {
  data: T | undefined;
  postRequest: PostCall<T>;
  isLoading: boolean;
  error: Error | undefined;
};
export default function useCreateAccount(): PostResponse<AccountT> {
  const [response, setResponse] = useState<AccountT>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const postRequest = useCallback(async (data: AccountT) => {
    setError(undefined);
    setIsLoading(true);
    try {
      const resp = await axios
        .post<AccountT>(url, data)
        .then((res) => res.data);
      setResponse(resp);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  return {
    postRequest,
    data: response,
    isLoading,
    error,
  };
}
