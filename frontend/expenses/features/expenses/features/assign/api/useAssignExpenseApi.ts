"use client";

import config from "@/app-config.json";
import RequestApiT from "@/common/api/RequestApiT";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { PlannedExpenseDto } from "@/features/expenses/features/assign/api/PlannedExpenseDtoT";

const url = config.backend.expenses.assign;

export default function useAssignExpenseApi(): RequestApiT<PlannedExpenseDto.Type> {
  const [apiState, setApiState] = useState<ApiStateT<PlannedExpenseDto.Type>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(
    async (data: PlannedExpenseDto.Type) => {
      setApiState({ ...apiState, isLoading: true, error: null });

      try {
        const axiosResponse = await axios
          .post<PlannedExpenseDto.Type>(url, data)
          .finally();
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
