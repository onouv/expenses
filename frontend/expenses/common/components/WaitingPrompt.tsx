import { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Paper, Stack, Typography } from "@mui/material";

type Props = { prompt: string };
export const WaitingPrompt: React.FC = ({ prompt }: Props): ReactElement => (
  <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3}>
        <Stack alignItems="center" padding={2} spacing={4}>
          <Typography>{prompt}</Typography>
          <CircularProgress size={80} />
        </Stack>
      </Paper>
    </Box>
  </>
);
