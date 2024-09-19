"use client";

import React, { ReactElement } from "react";
import { IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import Grid from "@mui/material/Grid";

type Props = {
  title: string;
  backUrl: string | null;
  children;
};

const FeaturePage: React.FC = ({
  title,
  backUrl,
  children,
}: Props): ReactElement => {
  const backL = (backPath: string | null) => {
    if (backPath) {
      return (
        <Link href={backPath}>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
        </Link>
      );
    } else return null;
  };

  return (
    <Stack spacing={2} padding={2}>
      <Paper elevation={3}>
        <Grid container padding={2}>
          <Grid item xs={4}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid container justifyContent="flex-end">
              <Grid item>{backL(backUrl)}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3}>{children}</Paper>
    </Stack>
  );
};

export default FeaturePage;
