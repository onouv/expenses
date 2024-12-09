"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuDrawer from "@/components/MenuDrawer";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
/*
export const metadata: Metadata = {
  title: "Expenses",
  description: "A web app to track expenses for small businesses.",
};
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack padding={2}>
              <AppBar component="nav">
                <Toolbar>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={1}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">EXPENSES</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Grid
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid item xs={1}>
                          <AccountCircleIcon />
                        </Grid>
                        <Grid item xs={1}>
                          <Link href="/">
                            <IconButton color="inherit" aria-label="log out">
                              <LogoutIcon />
                            </IconButton>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <nav>
                <MenuDrawer isOpen={drawerIsOpen} toggleOpen={toggleDrawer} />
              </nav>
              <Toolbar />
              {children}
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

/*
<Box sx={{ flexGrow: 1 }}>
<Container maxWidth="xl">
 */
