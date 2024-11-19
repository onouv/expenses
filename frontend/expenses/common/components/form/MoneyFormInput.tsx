"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import TextFormInput from "@/components/form/TextFormInput";
import React, { ReactElement } from "react";
import {
  ListItemIcon,
  ListItemText,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CurrencyE from "@/common/types/CurrencyE";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useFormContext } from "react-hook-form";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import { plannedExpenseFieldNames } from "@/features/expenses/types/PlannedExpenseT";
import { moneyFieldNames } from "@/common/types/MoneyT";

const currencies = [
  {
    key: CurrencyE.CHF,
    name: "Swiss Francs",
    icon: () => <CurrencyFrancIcon />,
  },
  { key: CurrencyE.EUR, name: "Euros", icon: () => <EuroIcon /> },
  {
    key: CurrencyE.GBP,
    name: "British Pounds",
    icon: () => <CurrencyPoundIcon />,
  },
];

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
          <TextFormInput fieldName={valueName} label="Amount" />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name={currencyName}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl size="small" fullWidth>
                <Select variant="filled" value={value} onChange={onChange}>
                  {currencies.map((currency) => (
                    <MenuItem key={currency.key} value={currency.key}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <ListItemIcon>{currency.icon()}</ListItemIcon>
                        </Grid>
                        <Grid>
                          <ListItemText>{currency.name}</ListItemText>
                        </Grid>
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
