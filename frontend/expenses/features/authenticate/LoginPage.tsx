'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import {ReactElement, useState} from "react";
import Link from "next/link";

export const LoginPage: React.FC = (): ReactElement => {

    const [loginDisabled, setLoginDisabled] = useState(true);
    const [cancelDisabled, setCancelDisabled] = useState(true);


    const LoginButton = () => {
        if (loginDisabled) {
            return (
                <Button variant="contained" disabled>Login</Button>
            );
        }

        return (
            <Link href="/account" disabled={loginDisabled}>
                <Button variant="contained">Login</Button>
            </Link>
        )
    }

    const CancelButton = () => {
        if (cancelDisabled) {
            return (
                <Button variant="contained" disabled>Cancel</Button>
            )
        }

        return (
            <Link href="/">
                <Button variant="contained" disabled>Cancel</Button>
            </Link>
        )
    }

    return (
        <Box width={400} height={250} padding={4}>
            <Stack spacing={2}>

                <TextField required error={false} id="login-name" label="user name" onChange={}/>
                <TextField required id="login-password" label="user password"/>
                <Stack direction="row" spacing={2}>
                    <LoginButton />
                    <CancelButton />
                </Stack>
            </Stack>
        </Box>
    );
}