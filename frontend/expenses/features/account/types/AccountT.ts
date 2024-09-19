import { InferType, object, string } from "yup";

export const accountSchema = object({
  accountNo: string()
    .required()
    .matches(/([A-Z0-9]){1,8}/),
  name: string()
    .required()
    .matches(/(\w{1,32})/),
  description: string().matches(/(\w{1,64})/),
});

type AccountT = InferType<typeof accountSchema>;

export const defaultAccount: AccountT = {
  accountNo: "",
  name: "",
  description: undefined,
};

export default AccountT;
