import { ReactElement } from "react";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";

type Props = {
  account: AccountDetailsT;
};
const AccountDetails = ({ account }: Props): ReactElement => {
  return <>Account Details</>;
};

export default AccountDetails;
