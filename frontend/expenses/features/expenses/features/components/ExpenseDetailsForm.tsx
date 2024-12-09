import React, { ReactElement, useEffect } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextFormInput from "@/components/form/TextFormInput";
import PlannedExpenseT, {
  defaultPlannedExpense,
  plannedExpenseFieldNames,
  PlannedExpenseTSchema,
} from "@/features/expenses/types/PlannedExpenseT";
import DateFormInput from "@/components/form/DateFormInput";
import MoneyFormInput from "@/components/form/MoneyFormInput";
import CheckboxFormInput from "@/components/form/CheckboxFormInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PaymentTypeInput from "@/features/expenses/components/PaymentTypeInput";
import FormResetButton from "@/components/form/FormResetButton";
import { detailsUrlPartial } from "@/features/accounts/features/details/utils/route";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import ExpenseT from "@/features/accounts/types/ExpenseT";

type Props = {
  account: AccountDetailsT;
  expense?: ExpenseT;
};
const ExpenseDetailsForm = ({ account, expense }: Props): ReactElement => {
  const formMethods = useForm<PlannedExpenseT>({
    defaultValues: expense
      ? { ...expense, accountNo: account.accountNo }
      : { ...defaultPlannedExpense, accountNo: account.accountNo },
    resolver: yupResolver(PlannedExpenseTSchema),
  });

  const { requestCall, isLoading, isSuccessful, error } = useAssignExpenseApi();
  const router = useRouter();

  useEffect(() => {
    if (isSuccessful) {
      router.push(detailsUrlPartial(account.accountNo));
    }
  }, [isSuccessful, router, account.accountNo]);

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
            router.push(detailsUrlPartial(account.accountNo));
          }}
        >
          CANCEL
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button onClick={formMethods.handleSubmit(onSubmit)}>SAVE</Button>
      </Grid>
    </Grid>
  );

  return (
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
  );
};

export default ExpenseDetailsForm;
