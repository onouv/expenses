"use client";

import config from "@/app-config.json";
import PostResponseT from "@/common/api/PostResponseT";
import { useCallback, useState } from "react";
import axios from "axios";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

const url = config.BACKEND_SERVICE_BASE_URL + config.EXPENSE_ASSIGN_PARTIAL_URL;

export default function useAssignExpenseApi(): PostResponseT<PlannedExpenseT> {
  const [response, setResponse] = useState<PlannedExpenseT>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const postRequest = useCallback(async (data: PlannedExpenseT) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const axiosResponse = await axios
        .post<PlannedExpenseT>(url, data)
        .then((resp) => resp.data);
      setResponse(axiosResponse);
    } catch (err: any) {
      setError(err);
    }

    setIsLoading(false);
  }, []);

  return {
    postRequest,
    data: response,
    isLoading,
    error,
  };
}
