"use client";

import AccountT from "@/features/accounts/types/AccountT";
import { useCallback, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import config from "@/app-config.json";
import RequestApiT from "@/common/api/RequestApiT";
import ApiStateT from "@/common/api/ApiStateT";

const url = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_CREATE_PARTIAL_URL;

export default function useCreateAccountApi(): RequestApiT<AccountT> {
  const [apiState, setApiState] = useState<ApiStateT<AccountT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(async (data: AccountT) => {
    setApiState({ ...apiState, isLoading: true, error: null });
    try {
      const resp = await axios.post<AccountT>(url, data).finally();
      if (
        resp.status == HttpStatusCode.Created ||
        resp.status == HttpStatusCode.Ok
      ) {
        setApiState({ ...apiState, isSuccessful: true, isLoading: false });
      } else {
        setApiState({
          ...apiState,
          isSuccessful: false,
          isLoading: false,
          error: new Error(
            `Server could not create account (status code ${resp.status})`,
          ),
        });
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.errorMessages.length > 0
          ? err.response?.data?.errorMessages[0]
          : "Unknown Application Error";

      setApiState({
        ...apiState,
        isLoading: false,
        isSuccessful: false,
        error: new Error(errorMsg),
      });
    }
  }, []);

  return {
    requestCall: postRequest,
    isLoading: apiState.isLoading,
    isSuccessful: apiState.isSuccessful,
    error: apiState.error,
  };
}
