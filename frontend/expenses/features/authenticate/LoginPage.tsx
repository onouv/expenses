'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import React, {ReactElement, useState} from "react";
import Link from "next/link";


export const LoginPage: React.FC = (): ReactElement => {

    const [name, setName] = useState("");
    const [nameIsValid, setNameIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const LoginButton = () => {
        console.log(`name: ${name}, isValid: ${nameIsValid}`)
        console.log(`password: ${password}, isValid: ${passwordIsValid}`);
        if (nameIsValid && passwordIsValid) {
            return (
                <Link href="/account">
                    <Button variant="contained">Login</Button>
                </Link>
            );
        }

        return (
            <Button variant="contained" disabled>Login</Button>
        )
    }

    const CancelButton = () => {
        if (name.length != 0 || password.length != 0) {
            return (
                <Link href="/">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setName('');
                            setNameIsValid(false);
                            setPassword('');
                            setPasswordIsValid(false);
                        }}>
                        Cancel
                    </Button>
                </Link>
            )
        }

        return (
            <Button variant="contained" disabled>Cancel</Button>
        )
    }

    return (
        <Box width={400} height={250} padding={4}>
            <Stack spacing={2}>

                <TextField
                    value={name}
                    required
                    error={false}
                    id="login-name"
                    label="user name"
                    onChange={(event: object) => {
                        if (event.target.value) {
                            setNameIsValid(true);
                            setName(event.target.value);
                        }
                    }}
                />
                <TextField
                    value={password}
                    required
                    id="login-password"
                    label="user password"
                    onChange={(event: object) => {
                        if (event.target.value) {
                            setPasswordIsValid(true);
                            setPassword(event.target.value);
                        }
                    }}
                />
                <Stack direction="row" spacing={2}>
                    <LoginButton />
                    <CancelButton />
                </Stack>
            </Stack>
        </Box>
    );
}