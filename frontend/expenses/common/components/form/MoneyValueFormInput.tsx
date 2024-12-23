import { Controller, useFormContext } from "react-hook-form";
import { ReactElement } from "react";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import FormInputPropsT from "@/components/form/FormInputPropsT";

const MoneyValueFormInput = ({
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const muiProps = {
          error: !!error,
          helperText: error ? "Must enter a value, even if 0" : null,
          label: label,
          fullWidth: true,
        };
        return (
          <NumericFormat
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            onChange={onChange}
            value={value}
            customInput={TextField}
            inputProps={{ "data-testid": "money-value-input" }}
            {...muiProps}
          />
        );
      }}
    />
  );
};

export default MoneyValueFormInput;
