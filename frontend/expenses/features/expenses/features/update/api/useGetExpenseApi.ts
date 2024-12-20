"use client";

import config from "@/app-config.json";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { ExpenseEntityDto } from "@/features/expenses/features/update/api/ExpenseEntityDto";
import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";

const url = (expenseId: number) =>
  `${config.backend.expenses.details}/${expenseId}`;

export default function useGetExpenseApi(
  expenseId: number,
): ApiStateT<ExpenseEntityT> {
  const [apiState, setApiState] = useState<ApiStateT<ExpenseEntityT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    (async () => {
      try {
        setApiState((a) => ({ ...apiState, isLoading: true, error: null }));
        const resp = await axios.get<ExpenseEntityDto.Type>(url(expenseId));
        const response = ExpenseEntityDto.to(resp.data);
        setApiState((a) => ({
          ...apiState,
          isLoading: false,
          isSuccessful: true,
          data: response,
        }));
      } catch (error: any) {
        const errorMsg =
          error.response.data.errorMessages.length > 0
            ? error.response.data.errorMessages[0]
            : "Unknown Application Error at update expense API";

        setApiState((a) => ({
          ...apiState,
          isLoading: false,
          error: new Error(errorMsg),
        }));
      }
    })();
  }, [expenseId]);

  return {
    isSuccessful: apiState.isSuccessful,
    isLoading: apiState.isLoading,
    data: apiState.data,
    error: apiState.error,
  };
}
