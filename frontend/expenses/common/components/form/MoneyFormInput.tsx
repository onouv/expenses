"use client";

import FormInputPropsT from "@/components/form/FormInputPropsT";
import { Controller } from "react-hook-form";
import TextFormInput from "@/components/form/TextFormInput";

type Props = FormInputPropsT & {
  onChange: (value: number) => void;
};
const MoneyFormInput = ({ fieldName, control, label }: FormInputPropsT) => {
  const handleChange = (event: object): void => {
    const entry = event.target.value as string;
  };

  return <TextFormInput fieldName={name} label={label} control={control} />;
};

export default MoneyFormInput;

export const MoneyForm = ({
  control,
  fieldName,
  label,
}: FormInputPropsT): ReactElement => (
  <Box>
    <Stack>
      <Divider />
      <Typography variant="subtitle1">{label}</Typography>
      <Grid container direction="row" columnSpacing={2}>
        <Grid item xs={8}>
          <TextFormInput
            control={control}
            fieldName={`${fieldName}.magnitude`}
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
  </Box>
);
