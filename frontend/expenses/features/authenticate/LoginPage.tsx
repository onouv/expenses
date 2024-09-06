'use client'

import { Box, Button, Stack, TextField, Typography  } from '@mui/material'
import React, {ReactElement, useState} from "react";
import Link from "next/link";
import config from "@/app-config.json";

type LoginData = {
    name: string;
    nameIsValid: boolean;
    password: string;
    passwordIsValid: boolean;
}

const defaultData: LoginData = {
    name: "",
    nameIsValid: false,
    password: "",
    passwordIsValid: false
};

type Props = {
    caption: string
}

const LoginPage: React.FC = ( { caption }: Props): ReactElement => {

    const [data, setData] = useState<LoginData>(defaultData);

    const LoginButton = () => {
        if (data.nameIsValid && data.passwordIsValid) {
            return (
                <Link href={config.ACCOUNT_PARTIAL_URL}>
                    <Button variant="contained">Login</Button>
                </Link>
            );
        }

        return (
            <Button variant="contained" disabled>Login</Button>
        )
    }

    const CancelButton = () => {
        if (data.name.length != 0 || data.password.length != 0) {
            return (
                <Link href="/">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setData(defaultData);
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
        <Box width={400} minHeight={250} padding={4}>
            <Stack spacing={2}>
                <Typography variant="h4">
                    {caption}
                </Typography>
                <TextField
                    value={data.name}
                    required
                    error={false}
                    id="login-name"
                    label="user name"
                    onChange={(event: object) => {
                        if (event.target.value) {
                            setData({
                                ...data,
                                name: event.target.value,
                                nameIsValid: true
                            });
                        }
                    }}
                />
                <TextField
                    value={data.password}
                    type="password"
                    required
                    id="login-password"
                    label="user password"
                    onChange={(event: object) => {
                        if (event.target.value) {
                            setData({
                                ...data,
                                password: event.target.value,
                                passwordIsValid: true
                            });
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

export default LoginPage;