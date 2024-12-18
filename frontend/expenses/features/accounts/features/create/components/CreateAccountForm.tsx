"use client";

import React, { ReactElement, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountT, {
  AccountSchema,
  defaultAccount,
} from "@/features/accounts/types/AccountT";
import config from "@/app-config.json";
import { Box, Button, Stack } from "@mui/material";
import useCreateAccountApi from "@/features/accounts/features/create/api/useCreateAccountApi";
import ErrorPage from "@/common/components/ErrorPage";
import WaitingPrompt from "@/common/components/WaitingPrompt";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import TextFormInput from "@/common/components/form/TextFormInput";
import FormSaveButton from "@/components/form/FormSaveButton";
import FormResetButton from "@/components/form/FormResetButton";

const CreateAccountForm: React.FC = (): ReactElement => {
  const { requestCall, isLoading, isSuccessful, error } = useCreateAccountApi();
  const router = useRouter();
  const formMethods = useForm<AccountT>({
    defaultValues: defaultAccount,
    resolver: yupResolver(AccountSchema),
  });

  useEffect(() => {
    if (isSuccessful) {
      router.push(config.frontend.accounts.default);
    }
  }, [isSuccessful, router]);

  const onSubmit = async (data: AccountT) => {
    await requestCall(data);
  };

  if (error) {
    return (
      <ErrorPage
        prompt="Error while saving account to server."
        nextRoute={config.frontend.accounts.create}
      />
    );
  }

  if (isLoading) {
    return <WaitingPrompt prompt="Saving data to server..." />;
  }

  return (
    <FormProvider {...formMethods}>
      <Box padding={2}>
        <Stack spacing={2}>
          <TextFormInput fieldName="accountNo" label="Account No" />
          <TextFormInput fieldName="accountName" label="Account Name" />
          <TextFormInput fieldName="accountDescription" label="Description" />
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "flex-end" }}
            columnSpacing={2}
          >
            <Grid item xs={1}>
              <FormResetButton />
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={() => {
                  router.push(config.frontend.accounts.default);
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={1}>
              <FormSaveButton onClick={formMethods.handleSubmit(onSubmit)} />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default CreateAccountForm;
