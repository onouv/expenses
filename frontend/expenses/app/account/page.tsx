import  AccountT from "@/features/account/Account";
import React from "react";
import AccountsListing from "@/features/account/components/AccountsListing";

const accounts = [
    {
        accountNo: '0001',
        name: 'Test Account 1',
        description: 'testing'
    },
    {
        accountNo: '0002',
        name: 'Test Account 1',
        description: 'testing'
    },
    {
        accountNo: '0003',
        name: 'Test Account 3',
        description: 'testing'
    }
];

const AccountsPage: React.FC = () => {

    return (
      <AccountsListing accounts={accounts} />
    );
}

export default AccountsPage;