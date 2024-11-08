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
  postCall: PostCall<T>;
  isLoading: boolean;
  error: Error;
};
export default function useCreateAccount(): PostResponse<AccountT> {
  const [response, setResponse] = useState<AccountT>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const postCall = useCallback(async (data: AccountT) => {
    setError(null);
    setIsLoading(true);
    try {
      const resp = await axios
        .post<AccountT>(url, data)
        .then((res) => res.data);
      setResponse(resp);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return {
    postCall,
    data: response,
    isLoading,
    error,
  };
}
