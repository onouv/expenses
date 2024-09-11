"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from './theme.ts';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuDrawer from "@/components/MenuDrawer";
import Grid from "@mui/material/Grid";

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
    setDrawerIsOpen((prevState) => !prevState)
  }

  return (
    <html lang="en">
    <body className={inter.className}>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>

          <CssBaseline/>
          <AppBar position="static" component="nav">

              <Toolbar >
                <Grid container justifyContent="flex-start">
                  <Grid item xs={1}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                    >
                      <MenuIcon/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <IconButton color="inherit"
                                    aria-label="log out"
                        >
                          <LogoutIcon/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Toolbar>

          </AppBar>
          <nav>
            <MenuDrawer isOpen={drawerIsOpen} toggleOpen={toggleDrawer}/>
          </nav>
          <Toolbar/>
          {children}

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
