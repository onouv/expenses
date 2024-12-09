import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

