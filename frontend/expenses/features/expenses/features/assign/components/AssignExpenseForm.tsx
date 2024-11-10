"use client";

import config from "@/app-config.json";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Box, Button, Paper, Stack } from "@mui/material";
import React, { ReactElement } from "react";
import PlannedExpenseT, {
  defaultPlannedExpense,
  PlannedExpenseTSchema,
} from "@/features/expenses/features/assign/api/PlannedExpenseT";
import { useForm } from "react-hook-form";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import TextFormInput from "@/components/form/TextFormInput";
import { DatePicker } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const { postRequest, isLoading, error } = useAssignExpenseApi();
  const router = useRouter();
  const { control, handleSubmit } = useForm<PlannedExpenseT>({
    defaultValues: defaultPlannedExpense,
    resolver: yupResolver(PlannedExpenseTSchema),
  });

  const onSubmit = async (data: PlannedExpenseT) => {
    await postRequest(data);
    router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
  };

  if (error) {
    return (
      <ErrorPage
        prompt="Error while saving expense to server."
        nextRoute={config.ACCOUNT_DETAILS_PARTIAL_URL}
      />
    );
  }

  if (isLoading) {
    return <WaitingPrompt prompt="Saving data to server..." />;
  }

  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <Paper elevation={3}>
        <Box padding={2}>
          <Stack spacing={2}>
            <TextFormInput
              name="recipient"
              control={control}
              label="Recipient"
            />
            <TextFormInput name="purpose" control={control} label="Purpose" />
            <DatePicker label="Accrued" />
            <DatePicker label="Payment" />

            <Grid
              container
              direction="row"
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Button
                  onClick={() => {
                    router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleSubmit(onSubmit)}>SAVE</Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default AssignExpenseForm;
