import { ReactElement } from "react";
import ExpenseT from "@/features/accounts/types/ExpenseT";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box, Typography } from "@mui/material";

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
            <TableRow hover key={expense.expenseId}>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{expense.expenseId}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{`${expense.amount.value} ${expense.amount.currency}`}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{expense.recipient}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{expense.accruedDate.toString()}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{expense.purpose}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography>{expense.paymentStatus}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ExpensesTable;
