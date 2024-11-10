"use client";

import AccountT from "@/features/accounts/types/AccountT";
import { useCallback, useState } from "react";
import axios from "axios";
import config from "@/app-config.json";
import PostResponseT from "@/common/api/PostResponseT";

const url = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;

export default function useCreateAccountApi(): PostResponseT<AccountT> {
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
    } catch (err: any) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return {
    postRequest,
    data: response,
    isLoading,
    error,
  };
}
