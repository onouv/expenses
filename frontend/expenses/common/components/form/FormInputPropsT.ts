import { Control, FieldValues } from "react-hook-form";

export type FormInputPropsT = {
  control: Control<FieldValues> | undefined;
  label: string;
  name: string;
  onChange?: (event: object) => void;
};
export default FormInputPropsT;
