"use client";

import config from "@/app-config.json";
import { WriteApiT } from "@/common/api/write-api";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { ExpenseEntityDto } from "@/features/expenses/features/update/api/ExpenseEntityDto";
import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";

const url = config.backend.expenses.update;

export default function useUpdateExpenseApi(): WriteApiT<ExpenseEntityT> {
  const [apiState, setApiState] = useState<ApiStateT<ExpenseEntityT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const patchRequest = useCallback(
    async (expense: ExpenseEntityT) => {
      setApiState({ ...apiState, isLoading: true, error: null });

      const payload = ExpenseEntityDto.of(expense);

      try {
        const axiosResponse = await axios
          .patch<ExpenseEntityDto.Type>(url, payload)
          .finally();
        setApiState({ ...apiState, isLoading: false, isSuccessful: true });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error at update expense API";

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
    requestCall: patchRequest,
    isSuccessful: apiState.isSuccessful,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
}
