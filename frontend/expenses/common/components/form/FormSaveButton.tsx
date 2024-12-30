import React from "react";
import { useFormState } from "react-hook-form";
import { Button } from "@mui/material";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const FormSaveButton = ({ onClick }: Props) => {
  const { isDirty, dirtyFields, isValid } = useFormState();

  if (isDirty && Object.keys(dirtyFields).length > 0 && isValid) {
    return (
      <Button
        onClick={(event) => {
          onClick(event);
        }}
      >
        SAVE
      </Button>
    );
  }

  return <Button disabled>SAVE</Button>;
};

export default FormSaveButton;
