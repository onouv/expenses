"use client";

import { ReactElement, useEffect, useState } from "react";
import ExpenseSummaryT from "@/features/accounts/features/details/types/ExpenseSummaryT";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import config from "@/app-config.json";

type Props = {
  expenses: ExpenseSummaryT[];
  selections: number[];
  select: (idx: number) => void;
  unSelect: (idx: number) => void;
};

const ExpensesTable = (props: Props): ReactElement => {
  const router = useRouter();

  const routeToExpenseDetails = (expense: ExpenseSummaryT) => () => {
    router.push(
      `${config.frontend.expenses.update}?expenseid=${expense.expenseId}`,
    );
  };

  return (
    <Box padding={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}></TableCell>

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
            {props.expenses.map((expense: ExpenseSummaryT) => {
              const checked = props.selections.includes(expense.expenseId);
              return (
                <TableRow hover key={expense.expenseId}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Checkbox
                      checked={checked}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (event.target.checked) {
                          props.select(expense.expenseId);
                        } else {
                          props.unSelect(expense.expenseId);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{expense.expenseId}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{`${expense.amount.value} ${expense.amount.currency}`}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{expense.recipient}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{expense.accruedDate.toString()}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{expense.purpose}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    onClick={routeToExpenseDetails(expense)}
                  >
                    <Typography>{expense.paymentStatus}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ExpensesTable;
