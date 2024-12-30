"use client";

import config from "@/app-config.json";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { ExpenseDto } from "@/features/expenses/features/assign/api/ExpenseDto";
import ExpenseFormDataT from "@/features/expenses/types/ExpenseFormDataT";
import { Expense } from "@/features/expenses/types/Expense";
import { WriteApiT } from "@/common/api/write-api";

const url = config.backend.expenses.assign;

export default function useAssignExpenseApi(): WriteApiT<Expense.Type> {
  const [apiState, setApiState] = useState<ApiStateT<ExpenseFormDataT>>({
    isSaving: false,
    isSuccessful: false,
    error: null,
  });

  const postRequest = useCallback(
    async (expense: Expense.Type) => {
      setApiState({ ...apiState, isSaving: true, error: null });

      const payload: ExpenseDto.Type = ExpenseDto.of(expense);

      try {
        const axiosResponse = await axios
          .post<ExpenseDto.Type>(url, payload)
          .finally();
        setApiState({ ...apiState, isSaving: false, isSuccessful: true });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error at assign expense API";

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
    requestCall: postRequest,
    isSuccessful: apiState.isSuccessful,
    isSaving: apiState.isSaving,
    error: apiState.error,
  };
}
