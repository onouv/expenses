"use client";

import config from "@/app-config.json";
import RequestApiT from "@/common/api/RequestApiT";
import { useCallback, useState } from "react";
import axios from "axios";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import ApiStateT from "@/common/api/ApiStateT";

const url = config.backend.expenses.assign;

export default function useAssignExpenseApi(): RequestApiT<PlannedExpenseT> {
  const [apiState, setApiState] = useState<ApiStateT<PlannedExpenseT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(
    async (data: PlannedExpenseT) => {
      setApiState({ ...apiState, isLoading: true, error: null });

      try {
        const axiosResponse = await axios
          .post<PlannedExpenseT>(url, data)
          .then((resp) => resp.data);
        setApiState({ ...apiState, isLoading: false, isSuccessful: true });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error";

        setApiState({
          ...apiState,
          isLoading: false,
          error: new Error(errorMsg),
        });
      }
    },
    [apiState],
  );

  return {
    requestCall: postRequest,
    isSuccessful: apiState.isSuccessful,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
}
