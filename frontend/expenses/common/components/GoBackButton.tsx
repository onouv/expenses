import { ReactElement } from "react";

import { IconButton, Link } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
  backUrl?: string;
};

const GoBackButton = ({ backUrl }: Props): ReactElement => (
  <Link href={backUrl}>
    <IconButton>
      <ArrowBackIosNewIcon />
    </IconButton>
  </Link>
);

export default GoBackButton;
