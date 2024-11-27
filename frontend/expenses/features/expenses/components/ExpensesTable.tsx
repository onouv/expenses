"use client";

import { ReactElement, useEffect, useState } from "react";
import ExpenseT from "@/features/accounts/types/ExpenseT";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

type Props = {
  expenses: ExpenseT[];
  selections: number[];
  select: (idx: number) => void;
  unSelect: (idx: number) => void;
};

const ExpensesTable = (props: Props): ReactElement => (
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
            <TableCell sx={{ borderBottom: "none" }}>Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.expenses.map((expense: ExpenseT) => {
            const checked = props.selections.includes(expense.expenseId);
            return (
              <TableRow hover key={expense.expenseId}>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Checkbox
                    checked={checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.checked) {
                        props.select(expense.expenseId);
                      } else {
                        props.unSelect(expense.expenseId);
                      }
                    }}
                  />
                </TableCell>
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
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ExpensesTable;
