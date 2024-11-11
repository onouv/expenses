"use client";

import config from "@/app-config.json";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import PlannedExpenseT, {
  defaultPlannedExpense,
  PlannedExpenseTSchema,
} from "@/features/expenses/features/assign/api/PlannedExpenseT";
import { Controller, useForm } from "react-hook-form";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import TextFormInput from "@/components/form/TextFormInput";
import { DatePicker } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

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
        <Grid container direction="column" rowSpacing={2} padding={2}>
          <Grid item>
            <Typography variant="subtitle2">Expense</Typography>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="column" rowSpacing={2}>
                  <Grid item>
                    <Grid container direction="row" columnSpacing={2}>
                      <Grid item xs={4}>
                        <TextFormInput
                          name="recipient"
                          control={control}
                          label="Recipient"
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextFormInput
                          name="purpose"
                          control={control}
                          label="Purpose"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" columnSpacing={2}>
                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          name="accruedDate"
                          render={({ field: { onChange, value, ref } }) => (
                            <DatePicker
                              label="Accrued"
                              onChange={onChange}
                              value={dayjs(value)}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="row" columnSpacing={2}>
                  <Grid item xs={4}>
                    <RadioGroup>
                      <FormControlLabel
                        control={<Radio />}
                        label="Invoice Expected"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Not Invoiced"
                        value={false}
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={8}>
                    <Button>Upload Invoice</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="row" columnSpacing={2}>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name="paymentDate"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          label="Payment"
                          onChange={onChange}
                          value={dayjs(value)}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Button>Upload Receipt</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Grid item xs={1}>
                <Button
                  onClick={() => {
                    router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleSubmit(onSubmit)}>SAVE</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default AssignExpenseForm;
