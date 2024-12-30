import { InferType, object, string } from "yup";

type FieldNamesT = {
  accountNo: keyof Pick<Account.Type, "accountNo">;
  accountName: keyof Pick<Account.Type, "accountName">;
  accountDescription: keyof Pick<Account.Type, "accountDescription">;
};

export namespace Account {
  export const Schema = object({
    accountNo: string()
      .required()
      .matches(/([A-Z0-9]){1,8}/),
    accountName: string()
      .required()
      .matches(/(\w{1,32})/),
    accountDescription: string()
      .required()
      .matches(/(\w{1,64})/),
  });

  export type Type = InferType<typeof Schema>;
  /*
  type AccountT = {
    accountNo: string;
    accountName: string;
    accountDescription: string;
  };
   */

  export const Defaults: Type = {
    accountNo: "",
    accountName: "",
    accountDescription: "",
  };

  export const FieldNames: FieldNamesT = {
    accountNo: "accountNo",
    accountName: "accountName",
    accountDescription: "accountDescription",
  };
}

Object.freeze(Account.Schema);
Object.freeze(Account.Defaults);
Object.freeze(Account.FieldNames);
