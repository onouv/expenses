import { WriteApiT } from "@/common/api/write-api";
import config from "@/app-config.json";
import { useCallback, useState } from "react";
import ApiStateT from "@/common/api/ApiStateT";
import axios from "axios";

const url = config.backend.expenses.delete;

export default function useDeleteExpensesApi(): WriteApiT<number[]> {
  const [apiState, setApiState] = useState<ApiStateT<number[]>>({
    isSaving: false,
    isSuccessful: false,
    error: null,
  });

  const deleteRequest = useCallback(
    async (ids: number[]) => {
      setApiState({ ...apiState, isSaving: true, error: null });

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
        setApiState({ ...apiState, isSuccessful: true, isSaving: false });
      } catch (err: any) {
        const errorMsg =
          err.response.data.errorMessages.length > 0
            ? err.response.data.errorMessages[0]
            : "Unknown Application Error";

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
    requestCall: deleteRequest,
    isSaving: apiState.isSaving,
    isSuccessful: apiState.isSuccessful,
    error: apiState.error,
  };
}
