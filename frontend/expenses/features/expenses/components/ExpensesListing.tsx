"use client";

import React, { ReactElement, useEffect, useState } from "react";
import ExpenseT from "@/common/types/ExpenseT";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ExpensesTable from "@/features/expenses/components/ExpensesTable";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import config from "@/app-config.json";
import useDeleteExpensesApi from "@/features/expenses/features/assign/api/useDeleteExpensesApi";
import ErrorPage from "@/components/ErrorPage";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import WaitingPrompt from "@/components/WaitingPrompt";
import { useRouter } from "next/navigation";

const clone = (arr: number[]): number[] => {
  const clone: number[] = [];
  arr.forEach((num) => {
    clone.push(num);
  });

  return clone;
};

type Selections = number[];
type Props = {
  account: string;
  expenses: ExpenseT[];
};
const ExpensesListing = ({ account, expenses }: Props): ReactElement => {
  const [selections, setSelections] = useState<Selections>([]);
  const { requestCall, isLoading, isSuccessful, error } =
    useDeleteExpensesApi();
  const router = useRouter();

  useEffect(() => {
    if (isSuccessful) {
      // notice: router.push or refresh don't work in this case, therefore complete reload
      // @ts-ignore
      window.location = accountDetailsUrl(account);
    }
  }, [isSuccessful, account, router]);

  if (error) {
    return (
      <ErrorPage
        prompt={error.message}
        nextRoute={accountDetailsUrl(account)}
      />
    );
  }

  if (isLoading) {
    return <WaitingPrompt prompt="Deleting selections from server..." />;
  }

  return (
    <Paper elevation={3}>
      <Stack spacing={2} padding={2}>
        <Typography variant="subtitle2">
          Expenses assigned to this Account
        </Typography>
        <ExpensesTable
          expenses={expenses}
          selections={selections}
          select={(id: number) => {
            setSelections((sel) => {
              const newSel = clone(sel);
              newSel.push(id);
              return newSel;
            });
          }}
          unSelect={(id: number) => {
            setSelections((sel) => {
              sel.splice(sel.indexOf(id), 1);
              return clone(sel);
            });
          }}
        />
        <Grid
          container
          padding={3}
          direction="row"
          columnSpacing={2}
          justifyContent="left"
          alignItems="center"
        >
          <Grid item>
            <Link
              href={{
                pathname: config.frontend.expenses.assign,
                query: { accountno: account },
              }}
            >
              <Button>Assign New Expense</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              onClick={async () => {
                await requestCall(selections);
              }}
              disabled={selections.length == 0}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ExpensesListing;
