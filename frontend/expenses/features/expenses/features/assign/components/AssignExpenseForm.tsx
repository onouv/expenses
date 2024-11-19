"use client";

import config from "@/app-config.json";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import PlannedExpenseDTO, {
  plannedExpenseFieldNames,
} from "@/features/expenses/types/PlannedExpenseT";
import PlannedExpenseT, {
  defaultPlannedExpense,
  PlannedExpenseTSchema,
} from "@/features/expenses/types/PlannedExpenseT";
import { Controller, FormProvider, useForm } from "react-hook-form";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import TextFormInput from "@/components/form/TextFormInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import CurrencyE from "@/common/types/CurrencyE";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import MoneyFormInput from "@/components/form/MoneyFormInput";
import DateFormInput from "@/components/form/DateFormInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormResetButton from "@/components/form/FormResetButton";
import CheckboxFormInput from "@/components/form/CheckboxFormInput";

const logout = (expense: PlannedExpenseT) => {
  console.info(`requesting to assign expense to account ${expense.accountNo}:\
    \n\trecipient: ${expense.recipient}\
    \n\tpurpose: ${expense.purpose}\
    \n\taccrued: ${expense.accruedDate}\
    `);
};

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  // const { postRequest, isLoading, error } = useAssignExpenseApi();
  // const router = useRouter();
  const formMethods = useForm<PlannedExpenseT>({
    defaultValues: { ...defaultPlannedExpense, accountNo: account.accountNo },
    resolver: yupResolver(PlannedExpenseTSchema),
  });

  const onSubmit = (data: PlannedExpenseT) => {
    logout(data);
    //await postRequest(data);
    //router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
  };

  /*
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
*/

  //
  // Inner components for various form segments ...
  //

  const CoreDataSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
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
      </Box>
    </Paper>
  );

  const AccruedDateSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <Controller
              control={formMethods.control}
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
      </Box>
    </Paper>
  );

  const UploadButton = (isInvoiced: boolean) => {
    if (isInvoiced) {
      return (
        <Button
          onClick={() => {
            console.log(`Uploading invoice...`);
          }}
        >
          Upload Invoice
        </Button>
      );
    }

    return <Button disabled>Upload Invoice</Button>;
  };

  const isInvoiced = formMethods.watch(plannedExpenseFieldNames.isInvoiced);
  const InvoicingSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <CheckboxFormInput
              fieldName={plannedExpenseFieldNames.isInvoiced}
              label="With Invoice"
            />
          </Grid>
          <Grid item xs={8}>
            {UploadButton(isInvoiced)}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const PaymentSegment = (
    <Paper elevation={3}>
      <Box padding={2}></Box>
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
            //router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
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
                    {AccruedDateSegment}
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
