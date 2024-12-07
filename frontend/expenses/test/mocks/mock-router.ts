// Mocks useRouter

const push = jest.fn();
const replace = jest.fn();
const prefetch = jest.fn();

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push,
      replace,
      prefetch,
    }),
  };
});

export type RouterMock = {
  push: jest.Mock;
  replace: jest.Mock;
  prefetch: jest.Mock;
};

const mockRouter: RouterMock = {
  push,
  replace,
  prefetch,
};

export default mockRouter;
