"use client";

import config from "@/app-config.json";
import PostResponseT from "@/common/api/PostResponseT";
import PlannedExpenseDTO from "@/features/expenses/features/assign/api/PlannedExpenseDTO";
import { useCallback, useState } from "react";
import axios from "axios";

const url = config.BACKEND_SERVICE_BASE_URL + config.EXPENSE_ASSIGN_PARTIAL_URL;

export default function useAssignExpenseApi(): PostResponseT<PlannedExpenseDTO> {
  const [response, setResponse] = useState<PlannedExpenseDTO>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const postRequest = useCallback(async (data: PlannedExpenseDTO) => {
    setError(undefined);
    setIsLoading(true);

    try {
      const axiosResponse = await axios
        .post<PlannedExpenseDTO>(url, data)
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
