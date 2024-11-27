import RequestApiT from "@/common/api/RequestApiT";
import config from "@/app-config.json";
import { useCallback, useState } from "react";
import ApiStateT from "@/common/api/ApiStateT";
import axios from "axios";

const url =
  config.BACKEND_SERVICE_BASE_URL + config.EXPENSES_DELETE_PARTIAL_URL;

export default function useDeleteExpensesApi(): RequestApiT<number[]> {
  const [apiState, setApiState] = useState<ApiStateT<number[]>>({
    isLoading: false,
    isSuccessful: false,
    error: null,
  });

  const deleteRequest = useCallback(
    async (ids: number[]) => {
      setApiState({ ...apiState, isLoading: true, error: null });

      try {
        const axiosResponse = await axios
          .request<number[]>({
            url: url,
            method: "delete",
            data: {
              expenseIds: ids,
            },
          })
          .finally();
        setApiState({ ...apiState, isSuccessful: true, isLoading: false });
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
    },
    [apiState],
  );

  return {
    requestCall: deleteRequest,
    isLoading: apiState.isLoading,
    isSuccessful: apiState.isSuccessful,
    error: apiState.error,
  };
}
