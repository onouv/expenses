import React, { ReactElement } from "react";
import { IconButton, Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  exitUrl?: string;
};

const ExitButton = ({ exitUrl }: Props): ReactElement => {
  const sanitizedUrl = exitUrl ? exitUrl : "/";
  return (
    <Link href={sanitizedUrl}>
      <IconButton>
        <LogoutIcon />
      </IconButton>
    </Link>
  );
};

export default ExitButton;
