"use client";

import React, { ReactElement } from "react";
import { Paper, Stack, Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import GoBackButton from "@/components/GoBackButton";

type Props = {
  title: string;
  backUrl?: string;
  children: ReactElement;
};

const FeaturePage = ({ title, backUrl, children }: Props): ReactElement => {
  const backButton = backUrl ? (
    <Grid item xs={8}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <GoBackButton backUrl={backUrl} />
        </Grid>
      </Grid>
    </Grid>
  ) : null;
  return (
    <Stack spacing={2} padding={2}>
      <Paper elevation={3}>
        <Grid container padding={2}>
          <Grid item xs={4}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          {backButton}
        </Grid>
      </Paper>
      <Paper elevation={3}>{children}</Paper>
    </Stack>
  );
};

export default FeaturePage;
