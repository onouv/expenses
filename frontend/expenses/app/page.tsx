import LoginPage from "@/features/login/LoginPage";
import React, { ReactElement } from "react";
import { Paper, Box } from "@mui/material";
const Home: React.FC = (): ReactElement => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    padding={2}
  >
    <Paper elevation={3}>
      <LoginPage />
    </Paper>
  </Box>
);

export default Home;
