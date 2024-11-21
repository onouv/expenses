import { ReactElement } from "react";
import ExpenseT from "@/features/accounts/types/ExpenseT";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ExpensesTable from "@/features/expenses/components/ExpensesTable";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import config from "@/app-config.json";

type Props = {
  account: string;
  expenses: ExpenseT[];
};
const ExpensesListing = ({ account, expenses }: Props): ReactElement => {
  return (
    <Paper elevation={3}>
      <Stack spacing={2} padding={2}>
        <Typography variant="subtitle2">
          Expenses assigned to this Account
        </Typography>
        <ExpensesTable expenses={expenses} />
        <Grid container padding={3} justifyContent="left" alignItems="center">
          <Grid item>
            <Link
              href={{
                pathname: config.EXPENSE_ASSIGN_PARTIAL_URL,
                query: { accountno: account },
              }}
            >
              <Button>Assign New Expense</Button>
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ExpensesListing;
