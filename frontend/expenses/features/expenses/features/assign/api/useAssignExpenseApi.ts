"use client";

import config from "@/app-config.json";
import PostResponseT from "@/common/api/PostResponseT";
import { useCallback, useState } from "react";
import axios from "axios";
import PlannedExpenseT, {
  defaultPlannedExpense,
} from "@/features/expenses/types/PlannedExpenseT";

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
      setApiState({ ...apiState, isLoading: false, error: err });
    }
  }, []);

  return {
    postRequest,
    data: apiState.response,
    isLoading: apiState.isLoading,
    error: apiState.error,
  };
}
