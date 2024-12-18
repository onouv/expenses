"use client";

import config from "@/app-config.json";
import WriteApiT from "@/common/api/WriteRequestApiT";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { PlannedExpenseDto } from "@/features/expenses/features/assign/api/PlannedExpenseDto";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

const url = config.backend.expenses.assign;

export default function useAssignExpenseApi(): WriteApiT<PlannedExpenseT> {
  const [apiState, setApiState] = useState<ApiStateT<PlannedExpenseT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(
    async (expense: PlannedExpenseT) => {
      setApiState({ ...apiState, isLoading: true, error: null });

      const payload: PlannedExpenseDto.Type = PlannedExpenseDto.of(expense);

      try {
        const axiosResponse = await axios
          .post<PlannedExpenseDto.Type>(url, payload)
          .finally();
        setApiState({ ...apiState, isLoading: false, isSuccessful: true });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error at assign expense API";

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
