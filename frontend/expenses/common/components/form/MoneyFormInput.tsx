"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import { Controller } from "react-hook-form";
import TextFormInput from "@/components/form/TextFormInput";

type Props = FormInputPropsT & {
  onChange: (value: number) => void;
};
const MoneyFormInput = ({ name, control, label, onChange }: Props) => {
  const handleChange = (event: object): void => {
    const entry = event.target.value as string;
  };

  return <TextFormInput name={name} label={label} control={control} />;
};

export default MoneyFormInput;
