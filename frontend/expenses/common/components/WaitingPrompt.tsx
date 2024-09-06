import {ReactElement} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, Typography } from '@mui/material';

type Props = { prompt: string };
export const WaitingPrompt : React.FC =  ({ prompt }: Props): ReactElement => (
    <>
        <Box sx={{ display: 'flex' }}>
            <Stack>
                <Typography>
                    {prompt}
                </Typography>
                <CircularProgress />
            </Stack>
        </Box>
    </>
);

