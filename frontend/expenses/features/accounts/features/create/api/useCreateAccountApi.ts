"use client";

import { Account } from "@/features/accounts/types/Account";
import { useCallback, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import config from "@/app-config.json";
import { WriteApiT } from "@/common/api/write-api";
import ApiStateT from "@/common/api/ApiStateT";

const url = config.backend.accounts.create;

export default function useCreateAccountApi(): WriteApiT<Account.Type> {
  const [apiState, setApiState] = useState<ApiStateT<Account.Type>>({
    isSaving: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(async (data: Account.Type) => {
    setApiState({ ...apiState, isSaving: true, error: null });
    try {
      const resp = await axios.post<Account.Type>(url, data).finally();
      if (
        resp.status == HttpStatusCode.Created ||
        resp.status == HttpStatusCode.Ok
      ) {
        setApiState({ ...apiState, isSuccessful: true, isSaving: false });
      } else {
        setApiState({
          ...apiState,
          isSuccessful: false,
          isSaving: false,
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
        isSaving: false,
        isSuccessful: false,
        error: new Error(errorMsg),
      });
    }
  }, []);

  return {
    requestCall: postRequest,
    isSaving: apiState.isSaving,
    isSuccessful: apiState.isSuccessful,
    error: apiState.error,
  };
}
