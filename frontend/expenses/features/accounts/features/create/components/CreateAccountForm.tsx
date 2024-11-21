"use client";

import React, { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountT, {
  AccountSchema,
  defaultAccount,
} from "@/features/accounts/types/AccountT";
import config from "@/app-config.json";
import { Box, Button, Stack } from "@mui/material";
import useCreateAccountApi from "@/features/accounts/api/useCreateAccountApi";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import TextFormInput from "@/components/form/TextFormInput";

const CreateAccountForm: React.FC = (): ReactElement => {
  const { postRequest, isLoading, error } = useCreateAccountApi();
  const router = useRouter();
  const formMethods = useForm<AccountT>({
    defaultValues: defaultAccount,
    resolver: yupResolver(AccountSchema),
  });

  const onSubmit = async (data: AccountT) => {
    await postRequest(data);
    router.push(config.ACCOUNTS_PARTIAL_URL);
  };

  if (error) {
    return (
      <ErrorPage
        prompt="Error while saving account to server."
        nextRoute={config.ACCOUNT_CREATE_PARTIAL_URL}
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
            padding={2}
            spacing={2}
          >
            <Grid item>
              <Button
                onClick={() => {
                  router.push(config.ACCOUNTS_PARTIAL_URL);
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={formMethods.handleSubmit(onSubmit)}>SAVE</Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default CreateAccountForm;
