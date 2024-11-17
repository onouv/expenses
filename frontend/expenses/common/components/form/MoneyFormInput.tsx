"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import TextFormInput from "@/components/form/TextFormInput";
import React, { ReactElement } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { fieldNames } from "@/features/expenses/types/PlannedExpenseT";
import MoneyMapper from "@/features/expenses/features/assign/utils/MoneyMapper";
import CurrencyE from "@/common/types/CurrencyE";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useFormContext } from "react-hook-form";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";

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
  control,
  setValue,
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  return (
    <Stack>
      <Divider />
      <Typography variant="subtitle1">{label}</Typography>
      <Grid container direction="row" columnSpacing={2}>
        <Grid item xs={8}>
          <TextFormInput
            control={control}
            fieldName={`${fieldName}.${fieldNames.amount}`}
            label="Amount"
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name={`${fieldName}.currency`}
            control={control}
            render={({ field: { value } }) => (
              <FormControl size="small" fullWidth>
                <Select variant="filled" value={value}>
                  {currencies.map((currency) => (
                    <MenuItem key={currency.key} value={currency.key}>
                      <Grid container direction="row" alignitems="center">
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
          <TextFormInput
            control={control}
            fieldName={`${fieldName}.currency`}
            label="Currency"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MoneyFormInput;
