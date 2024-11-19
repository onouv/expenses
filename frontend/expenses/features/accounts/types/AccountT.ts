import { InferType, object, string } from "yup";

export const AccountNumSchema = object({
  accountNo: string()
    .required()
    .matches(/([A-Z0-9]){1,8}/),
});

export const AccountSchema = AccountNumSchema.shape({
  accountName: string()
    .required()
    .matches(/(\w{1,32})/),
  accountDescription: string()
    .required()
    .matches(/(\w{1,64})/),
});

type AccountT = InferType<typeof AccountSchema>;
/*
type AccountT = {
  accountNo: string;
  accountName: string;
  accountDescription: string;
};
 */

export const defaultAccount: AccountT = {
  accountNo: "",
  accountName: "",
  accountDescription: "",
};

export default AccountT;
