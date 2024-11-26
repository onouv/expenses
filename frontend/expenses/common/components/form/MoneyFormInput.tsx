"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import TextFormInput from "@/components/form/TextFormInput";
import React, { ReactElement } from "react";
import { Select, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CURRENCIES } from "@/common/types/CurrencyE";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useFormContext } from "react-hook-form";
import { moneyFieldNames } from "@/common/types/MoneyT";
import MoneyValueFormInput from "@/components/form/MoneyValueFormInput";

export const MoneyFormInput = ({
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  const { control } = useFormContext();

  const valueName = `${fieldName}.${moneyFieldNames.value}`;
  const currencyName = `${fieldName}.${moneyFieldNames.currency}`;

  return (
    <Stack>
      <Typography variant="subtitle1">{label}</Typography>
      <Grid container direction="row" columnSpacing={2}>
        <Grid item xs={8}>
          <MoneyValueFormInput fieldName={valueName} label="Amount" />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name={currencyName}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl size="medium" fullWidth>
                <Select value={value} onChange={onChange}>
                  {CURRENCIES.map((currency) => (
                    <MenuItem key={currency.key} value={currency.key}>
                      <Grid
                        container
                        direction="row"
                        columnSpacing={2}
                        alignItems="center"
                      >
                        <Grid item>{currency.key}</Grid>
                        <Grid item>{currency.name}</Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MoneyFormInput;
