"use client";

import React, { ReactElement } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextFormInput from "@/components/form/TextFormInput";
import { ExpenseFormData } from "@/features/expenses/types/ExpenseFormData";
import DateFormInput from "@/components/form/DateFormInput";
import MoneyFormInput from "@/components/form/MoneyFormInput";
import CheckboxFormInput from "@/components/form/CheckboxFormInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PaymentTypeInput from "@/features/expenses/components/PaymentTypeInput";
import FormResetButton from "@/components/form/FormResetButton";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import { useRouter } from "next/navigation";
import FormSaveButton from "@/components/form/FormSaveButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Account } from "@/features/accounts/types/Account";

type Props = {
  account: Account.Type;
  initialValues: ExpenseFormData.Type;
  onSubmit: (formData: ExpenseFormData.Type) => Promise<void>;
};
const ExpenseDetailsForm = ({
  account,
  initialValues,
  onSubmit,
}: Props): ReactElement => {
  const formMethods = useForm<ExpenseFormData.Type>({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(ExpenseFormData.Schema),
  });

  const router = useRouter();

  const CoreDataSegment = (
    <Paper elevation={3}>
      <Stack columnGap={2} rowGap={2} padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <TextFormInput
              fieldName={ExpenseFormData.FieldNames.recipient}
              label="Recipient"
              key="plannedExpenseFieldNames.recipient"
            />
          </Grid>
          <Grid item xs={8}>
            <TextFormInput
              fieldName={ExpenseFormData.FieldNames.purpose}
              label="Purpose"
              key="plannedExpenseFieldNames.purpose"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <DateFormInput
              fieldName={ExpenseFormData.FieldNames.accruedDate}
              label="Date Accrued"
              key="plannedExpenseFieldNames.accruedDate"
            />
          </Grid>
          <Grid item xs={8}>
            <MoneyFormInput
              fieldName={ExpenseFormData.FieldNames.amount}
              key="plannedExpenseFieldNames.amount"
            />
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

  const isInvoiced = formMethods.watch(ExpenseFormData.FieldNames.isInvoiced);
  const InvoicingSegment = (
    <Paper elevation={3}>
      <Box padding={2}>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <Box marginLeft={1}>
              <CheckboxFormInput
                fieldName={ExpenseFormData.FieldNames.isInvoiced}
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
              fieldName={ExpenseFormData.FieldNames.paymentTargetDate}
              label="Payment Date"
            />
          </Grid>
          <Grid item xs={4}>
            <PaymentTypeInput
              fieldName={ExpenseFormData.FieldNames.paymentType}
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
            router.push(accountDetailsUrl(account.accountNo));
          }}
        >
          CANCEL
        </Button>
      </Grid>
      <Grid item xs={1}>
        <FormSaveButton onClick={formMethods.handleSubmit(onSubmit)} />
      </Grid>
    </Grid>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...formMethods}>
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
      </FormProvider>
    </LocalizationProvider>
  );
};

export default ExpenseDetailsForm;
