export type FormInputPropsT = {
  control: any;
  label: string;
  fieldName: string;
  onChange?: (event: object) => void;
  setValue?: (name: string, value: unknown, config?: Object) => void;
};
export default FormInputPropsT;
