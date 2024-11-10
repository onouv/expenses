import { ReactElement } from "react";
import ExpenseT from "@/features/accounts/types/Expense";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import MoneyAmount from "@/features/expenses/components/MoneyAmount";
import TableContainer from "@mui/material/TableContainer";
import { Box } from "@mui/material";

type Props = {
  expenses: ExpenseT[];
};
const ExpensesTable = ({ expenses }: Props): ReactElement => (
  <Box padding={3}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>ID</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Amount</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Recipient</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Accrued</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Purpose</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Payment Status</TableCell>
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
  </Box>
);

export default ExpensesTable;
