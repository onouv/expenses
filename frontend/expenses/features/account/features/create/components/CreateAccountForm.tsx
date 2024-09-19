"use client";

import React, { ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountT, { accountSchema } from "@/features/account/types/AccountT";
import config from "@/app-config.json";
import { Box, Button, FormGroup, Stack, TextField } from "@mui/material";
import useCreateAccount from "@/features/account/api/useCreateAccount";
import ErrorPage from "@/components/ErrorPage";
import { WaitingPrompt } from "@/components/WaitingPrompt";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";

const CreateAccountForm: React.FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountT>({
    resolver: yupResolver(accountSchema),
  });

  const { postCall, data, isLoading, error } = useCreateAccount();
  const router = useRouter();
  const onSubmit: SubmitHandler<AccountT> = (data) => {
    console.log("name: ", data.name);
    //postCall(account);
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
    <form>
      <Box padding={2}>
        <FormGroup>
          <Stack spacing={2}>
            <Controller
              name="accountNo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={data?.accountNo}
                  label="Account No"
                  id="create-account-no"
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={data?.name}
                  label="Name"
                  id="create-account-name"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={data?.description}
                  label="Description"
                  id="create-account-description"
                />
              )}
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
            </Grid>
            <Button
              onClick={() => {
                handleSubmit(onSubmit, () => {
                  console.log("VALIDATION FAILED");
                });
              }}
            >
              SAVE
            </Button>
          </Stack>
        </FormGroup>
      </Box>
    </form>
  );
};

export default CreateAccountForm;
