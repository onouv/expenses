"use client";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputPropsT } from "./FormInputPropsT";

const TextFormInput = ({ name, control, label }: FormInputPropsT) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default TextFormInput;
