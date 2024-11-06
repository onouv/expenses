import { ReactElement } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Children } from "react";

const ActionBar: React.FC = ({ children }): ReactElement => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    minWidth="85vh"
  >
    <Paper elevation={3}>
      {Children.map(children, (child) => (
        <Grid container>
          <Grid item>{child}</Grid>
        </Grid>
      ))}
    </Paper>
  </Box>
);

export default ActionBar;
