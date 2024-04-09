import type { ScreenshotParameters } from "storycap-testrun";

// ここでは Framework に `@storybook/react` を使った例
declare module "@storybook/react" {
  interface Parameters {
    screenshot?: ScreenshotParameters;
  }
}
