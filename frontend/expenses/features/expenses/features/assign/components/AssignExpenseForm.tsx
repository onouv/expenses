"use client";

import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { plannedExpenseFieldNames } from "@/features/expenses/types/PlannedExpenseT";
import PlannedExpenseT, {
  defaultPlannedExpense,
  PlannedExpenseTSchema,
} from "@/features/expenses/types/PlannedExpenseT";
import { FormProvider, useForm } from "react-hook-form";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import TextFormInput from "@/components/form/TextFormInput";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import MoneyFormInput from "@/components/form/MoneyFormInput";
import DateFormInput from "@/components/form/DateFormInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormResetButton from "@/components/form/FormResetButton";
import CheckboxFormInput from "@/components/form/CheckboxFormInput";
import PaymentTypeInput from "@/features/expenses/components/PaymentTypeInput";
import { detailsUrlPartial } from "@/features/accounts/features/details/utils/route";

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const { requestCall, isLoading, response, error } = useAssignExpenseApi();
  const router = useRouter();
  const formMethods = useForm<PlannedExpenseT>({
    defaultValues: { ...defaultPlannedExpense, accountNo: account.accountNo },
    resolver: yupResolver(PlannedExpenseTSchema),
  });

  useEffect(() => {
    if (response) {
      router.push(detailsUrlPartial(account.accountNo));
    }
  }, [response, router, account.accountNo]);

  const onSubmit = async (expense: PlannedExpenseT) => {
    await requestCall(expense);
  };

  if (error) {
    return (
      <ErrorPage
        prompt={error.message}
        nextRoute={detailsUrlPartial(account.accountNo)}
      />
    );
  }

  if (isLoading) {
    return <WaitingPrompt prompt="Saving data to server..." />;
  }

  //
  // Inner components for various form segments ...
  //

  const CoreDataSegment = (
    <Paper elevation={3}>
      <Stack columnGap={2} rowGap={2} padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <TextFormInput
              fieldName={plannedExpenseFieldNames.recipient}
              label="Recipient"
            />
          </Grid>
          <Grid item xs={8}>
            <TextFormInput
              fieldName={plannedExpenseFieldNames.purpose}
              label="Purpose"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <DateFormInput
              fieldName={plannedExpenseFieldNames.accruedDate}
              label="Date Accrued"
            />
          </Grid>
          <Grid item xs={8}>
            <MoneyFormInput fieldName={plannedExpenseFieldNames.amount} />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );

  const UploadButton = (label: string, isDisabled?: boolean) => {
    if (isDisabled === undefined || isDisabled) {
      return (
        <Button
          onClick={() => {
            console.log(`Uploading...`);
          }}
        >
          {label}
        </Button>
      );
    }

    return <Button disabled>{label}</Button>;
  };

  const isInvoiced = formMethods.watch(plannedExpenseFieldNames.isInvoiced);
  const InvoicingSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <Box marginLeft={1}>
              <CheckboxFormInput
                fieldName={plannedExpenseFieldNames.isInvoiced}
                label="With Invoice"
              />
            </Box>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            {UploadButton("Upload Invoice", isInvoiced)}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const PaymentSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <DateFormInput
              fieldName={plannedExpenseFieldNames.paymentDate}
              label="Payment Date"
            />
          </Grid>
          <Grid item xs={4}>
            <PaymentTypeInput
              fieldName={plannedExpenseFieldNames.paymentType}
              label="Payment Type"
            />
          </Grid>
          <Grid item xs={4}>
            {UploadButton("Upload Receipt")}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const FormButtonSegment = (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      sx={{
        justifyContent: "flex-end",
      }}
    >
      <Grid item xs={1}>
        <FormResetButton />
      </Grid>
      <Grid item xs={1}>
        <Button
          onClick={() => {
            console.log("Canceled.");
            router.push(detailsUrlPartial(account.accountNo));
          }}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button onClick={formMethods.handleSubmit(onSubmit)}>Save</Button>
      </Grid>
    </Grid>
  );

  //
  // ... inner components for segments
  //

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...formMethods}>
        <Stack spacing={2} padding={2}>
          <AccountHeader account={account} />
          <Paper elevation={3}>
            <Stack spacing={2} padding={2}>
              <Typography variant="subtitle2">Expense</Typography>
              <Paper elevation={3}>
                <Box padding={2}>
                  <Stack spacing={2}>
                    {CoreDataSegment}
                    {InvoicingSegment}
                    {PaymentSegment}
                    {FormButtonSegment}
                  </Stack>
                </Box>
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </FormProvider>
    </LocalizationProvider>
  );
};

export default AssignExpenseForm;

//<MoneyFormInput fieldName={plannedExpenseFieldNames.amount} />
