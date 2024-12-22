"use client";

import config from "@/app-config.json";
import { WriteApiT } from "@/common/api/write-api";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { ExpenseEntityDto } from "@/features/expenses/features/update/api/ExpenseEntityDto";
import { ExpenseEntity } from "@/features/expenses/types/ExpenseEntity";

const url = config.backend.expenses.update;

export default function useUpdateExpenseApi(): WriteApiT<ExpenseEntity.Type> {
  const [apiState, setApiState] = useState<ApiStateT<ExpenseEntity.Type>>({
    isSaving: false,
    isSuccessful: false,
    error: null,
  });

  const patchRequest = useCallback(
    async (expense: ExpenseEntity.Type) => {
      setApiState({ ...apiState, isSaving: true, error: null });

      const payload = ExpenseEntityDto.of(expense);

      try {
        await axios.patch<ExpenseEntityDto.Type>(url, payload).finally();
        setApiState({ ...apiState, isSaving: false, isSuccessful: true });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error at update expense API";

        setApiState({
          ...apiState,
          isSaving: false,
          error: new Error(errorMsg),
        });
      }
    },
    [apiState],
  );

  return {
    requestCall: patchRequest,
    isSuccessful: apiState.isSuccessful,
    isSaving: apiState.isSaving,
    error: apiState.error,
  };
}
