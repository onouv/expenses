import FormInputPropsT from "@/components/form/FormInputPropsT";
import React, { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PaymentTypeE from "@/common/types/PaymentTypeE";

const paymentTypes = Object.keys(PaymentTypeE);

const PaymentTypeInput = ({
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControl size="medium" fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
          >
            {paymentTypes.map((pT) => (
              <MenuItem key={pT} value={pT}>
                {pT}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default PaymentTypeInput;
