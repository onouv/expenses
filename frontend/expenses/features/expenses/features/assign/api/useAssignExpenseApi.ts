"use client";

import config from "@/app-config.json";
import PostResponseT from "@/common/api/PostResponseT";
import { useCallback, useState } from "react";
import axios from "axios";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

type ApiState = {
  response: PlannedExpenseT | null;
  isLoading: boolean;
  error: Error | null;
};

const url = config.BACKEND_SERVICE_BASE_URL + config.EXPENSE_ASSIGN_PARTIAL_URL;

export default function useAssignExpenseApi(): PostResponseT<PlannedExpenseT> {
  const [apiState, setApiState] = useState<ApiState>({
    response: null,
    isLoading: false,
    error: null,
  });

  const postRequest = useCallback(async (data: PlannedExpenseT) => {
    setApiState({ ...apiState, isLoading: true, error: null });

    try {
      const axiosResponse = await axios
        .post<PlannedExpenseT>(url, data)
        .then((resp) => resp.data);
      setApiState({ ...apiState, isLoading: false, response: axiosResponse });
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
  }, []);

  return {
    postRequest,
    data: apiState.response,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
}
