"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import TextFormInput from "@/components/form/TextFormInput";
import { ReactElement } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { fieldNames } from "@/features/expenses/types/PlannedExpenseT";
import MoneyMapper from "@/features/expenses/features/assign/utils/MoneyMapper";
import MoneyT from "@/common/types/MoneyT";
import CurrencyE from "@/common/types/CurrencyE";

export const MoneyFormInput = ({
  control,
  setValue,
  fieldName,
  label,
}: FormInputPropsT): ReactElement => {
  const onChange = (event: object): void => {
    // @ts-ignore
    const value = event.target?.value;

    const newAmount: MoneyT = MoneyMapper.asMoney(value, CurrencyE.EUR);
    if (setValue) {
      setValue(fieldNames.amount, newAmount);
      return;
    }

    console.error(
      "MoneyFormInput/onChange(): props.setValue needs to be initialized (FormInputProps)",
    );
  };

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
