import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AccountT from "@/features/account/types/AccountT";

type AccountState = {
    accounts: Array<AccountT>
}

const initialState : AccountState = {
    accounts: [],
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AccountT>) => {
            state.accounts.push(action.payload);
        }
    }
})

export const { add } = accountSlice.actions;

export default accountSlice.reducer;