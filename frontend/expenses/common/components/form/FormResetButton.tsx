import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "@mui/material";
import React, { ReactElement } from "react";

const FormResetButton = (): ReactElement => {
  const { reset } = useFormContext();
  const { isDirty } = useFormState();

  if (isDirty) {
    return <Button onClick={() => reset()}>Reset</Button>;
  }

  return <Button disabled>Reset</Button>;
};

export default FormResetButton;
