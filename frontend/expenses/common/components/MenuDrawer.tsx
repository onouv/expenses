"use client";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import config from "@/app-config.json";
import React from "react";

//const container = window !== undefined ? () => window().document.body : undefined;

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};
const MenuDrawer: React.FC = ({ isOpen, toggleOpen }: Props) => (
  <Drawer variant="temporary" open={isOpen} onClose={toggleOpen}>
    <Box onClick={toggleOpen} sx={{ textAlign: "center" }}>
      <List>
        <ListItem>
          <Typography variant="h6">ACTIONS</Typography>
        </ListItem>
        <ListItem>
          <Divider />
        </ListItem>
        <ListItem>
          <Link href={config.frontend.accounts.default}>
            <Typography>Accounts</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={config.frontend.expenses.default}>
            <Typography>Expenses</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={config.frontend.report.default}>
            <Typography>Reporting</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Divider />
        </ListItem>
        <ListItem>
          <Link href="/">
            <Typography>Log Out</Typography>
          </Link>
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

export default MenuDrawer;
