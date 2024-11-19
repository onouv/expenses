"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormInputPropsT from "@/components/form/FormInputPropsT";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const DateFormInput = ({ fieldName, label }: FormInputPropsT) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          label={label}
          onChange={onChange}
          value={dayjs(value)}
          slotProps={{ textField: { fullWidth: true } }}
        />
      )}
    />
  );
};

export default DateFormInput;
