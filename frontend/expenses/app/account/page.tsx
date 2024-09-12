'use client'

import  AccountT from "@/features/account/Account";
import React from "react";
import AccountsListing from "@/features/account/components/AccountsListing";
import useSWR from "swr";
import {WaitingPrompt} from "@/components/WaitingPrompt";
import config from "@/app-config.json";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";
import BasicTable from "@/features/account/components/Dummy";
import ActionBar from "@/features/account/components/ActionBar";
import {Box, Button, Stack} from "@mui/material";
import fetcher from "@/common/api/fetcher";
import useGetAccounts from "@/features/account/api/useGetAccounts";

const AccountsPage: React.FC = () => {

    const {
        data,
        error,
        isLoading
    } = useGetAccounts();

    if (isLoading) {
        return <WaitingPrompt prompt="Loading data from server..." />
    }

    if (error) {
        return <ErrorPage prompt="Error while loading data from server." nextRoute={'/'} />
    }

    return (

        <Stack>
            <AccountsListing accounts={data} />
        </Stack>

    );
}

export default AccountsPage;