import React, { ReactElement } from "react";
import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";

type Props = {
  prompt: string;
  advice?: string;
  nextRoute?: string;
};
const ErrorPage: React.FC = ({
  prompt,
  advice,
  nextRoute,
}: Props): ReactElement => {
  const route = nextRoute ? nextRoute : "/";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3}>
        <Stack padding={2}>
          <Typography variant="h6" color="error">
            {prompt}
          </Typography>
          <Typography variant="caption" color="error">
            {advice}
          </Typography>
          <Link href={nextRoute}>
            <Button>OK</Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ErrorPage;
