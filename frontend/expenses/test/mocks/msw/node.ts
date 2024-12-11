import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import handlers from "@/test/mocks/msw/api-handlers/account-handlers";

const mockServer = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  mockServer.listen();
});

//  Close server after all tests
afterAll(() => {
  mockServer.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  mockServer.resetHandlers();
});

export default mockServer;
