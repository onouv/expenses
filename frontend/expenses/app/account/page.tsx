'use client'

import  AccountT from "@/features/account/Account";
import React from "react";
import AccountsListing from "@/features/account/components/AccountsListing";
import useSWR from "swr";
import {WaitingPrompt} from "@/components/WaitingPrompt";
import config from "@/app-config.json";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";

const backendUrl = config.BACKEND_SERVICE_BASE_URL + config.ACCOUNT_PARTIAL_URL;
const fetcher = (url: string) => axios
    .get(url)
    .then(res => res.data);

const AccountsPage: React.FC = () => {

    console.log(`url: ${backendUrl}`)
    const {
        data,
        error,
        isLoading
    } = useSWR<AccountT[]>(backendUrl, fetcher);

    if (isLoading) {
        return <WaitingPrompt prompt="Loading data from server..." />
    }

    if (error) {
        return <ErrorPage prompt="Error while loading data from server." nextRoute={'/'} />
    }

    return (
      <AccountsListing accounts={data} />
    );
}

export default AccountsPage;