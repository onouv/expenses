import LoginPage from "@/features/authenticate/LoginPage";
import React, {ReactElement} from "react";
import { Paper, Box } from '@mui/material';
const Home: React.FC = (): ReactElement => (

        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="100vh"
             padding={2}
        >
            <Paper elevation={3}>
                <LoginPage caption={"Log Into Expenses"}/>
            </Paper>
        </Box>

);

export default Home;