"use client";

import config from "@/app-config.json";
import { useCallback, useState } from "react";
import axios from "axios";

import ApiStateT from "@/common/api/ApiStateT";
import { ExpenseEntityDto } from "@/features/expenses/features/update/api/ExpenseEntityDto";
import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";
import {ReadApiT} from "@/common/api/read-api";

const url = config.backend.expenses.details;

export default function useGetExpenseApi(): ReadApiT<ExpenseEntityT> {
  const [apiState, setApiState] = useState<ApiStateT<ExpenseEntityT>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const getRequest = useCallback(
    async () => {
      setApiState({ ...apiState, isLoading: true, error: null });

      try {
        const axiosResponse = await axios
          .get<ExpenseEntityDto.Type>(url)
          .then((resp) => {
            const expense: ExpenseEntityT = {
              ...resp.data,
            }
          });
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
    requestCall: getRequest,
    isSuccessful: apiState.isSuccessful,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
}
