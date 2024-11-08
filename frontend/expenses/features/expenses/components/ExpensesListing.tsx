import { ReactElement } from "react";
import ExpenseT from "@/features/accounts/types/Expense";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MoneyAmount from "@/features/expenses/components/MoneyAmount";
import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  expenses: ExpenseT[];
};
const ExpensesListing = ({ expenses }: Props): ReactElement => {
  return (
    <Paper elevation={3}>
      <Stack spacing={2} padding={2}>
        <Typography variant="subtitle2">Expenses</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>ID</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Amount</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Recipient</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Accrued</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Purpose</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  Payment Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense: ExpenseT) => (
                <TableRow key={expense.expenseId}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {expense.expenseId}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <MoneyAmount amount={expense.amount} />
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {expense.recipient}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {expense.accruedDate}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {expense.purpose}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {expense.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  );
};

export default ExpensesListing;
