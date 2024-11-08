"use client";

import React, { ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountT, {
  accountSchema,
  defaultAccount,
} from "@/features/accounts/types/AccountT";
import config from "@/app-config.json";
import { Box, Button, Stack } from "@mui/material";
import useCreateAccount from "@/features/accounts/api/useCreateAccount";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import TextFormInput from "@/components/form/TextFormInput";

const CreateAccountForm: React.FC = (): ReactElement => {
  const { postCall, data, isLoading, error } = useCreateAccount();
  const router = useRouter();
  const { control, handleSubmit } = useForm<AccountT>({
    defaultValues: defaultAccount,
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    postCall(data);
    router.push(config.ACCOUNT_PARTIAL_URL);
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
    <Box padding={2}>
      <Stack spacing={2}>
        <TextFormInput name="accountNo" control={control} label="Account No" />
        <TextFormInput
          name="accountName"
          control={control}
          label="Account Name"
        />
        <TextFormInput
          name="accountDescription"
          control={control}
          label="Description"
        />
        <Grid container padding={2} spacing={2}>
          <Grid item>
            <Button
              onClick={() => {
                router.push(config.ACCOUNT_PARTIAL_URL);
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
  );
};

export default CreateAccountForm;
