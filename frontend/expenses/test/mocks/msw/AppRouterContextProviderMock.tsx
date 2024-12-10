import { ReactNode } from "react";
import { Mock, vi } from "vitest";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

export type AppRouterContextProviderMockProps = {
  //router: Partial<AppRouterInstance>;
  children: ReactNode;
};

const push = vi.fn();
const replace = vi.fn();
const prefetch = vi.fn();
const back = vi.fn();
const forward = vi.fn();
const refresh = vi.fn();

export const AppRouterContextProviderMock = (
  props: AppRouterContextProviderMockProps,
): ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back,
    forward,
    push,
    replace,
    refresh,
    prefetch,
    //...props.router,
  };
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {props.children}
    </AppRouterContext.Provider>
  );
};
export type RouterMock = {
  back: Mock;
  forward: Mock;
  push: Mock;
  replace: Mock;
  refresh: Mock;
  prefetch: Mock;
};

export const mockRouter: RouterMock = {
  back,
  forward,
  push,
  replace,
  refresh,
  prefetch,
};
