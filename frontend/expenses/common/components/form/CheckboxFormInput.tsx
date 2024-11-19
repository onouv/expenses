import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormInputPropsT from "@/components/form/FormInputPropsT";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxFormInput = ({
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange} />
          )}
        />
      }
      label={label}
    />
  );
};

export default CheckboxFormInput;
