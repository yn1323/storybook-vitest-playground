import type { TestRunnerConfig } from "@storybook/test-runner";
import { screenshot } from "storycap-testrun";

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    await screenshot(page, context, {
      flakiness: {
        retake: {
          interval: 250, // 250ms 間隔で
          retries: 20, // 20回を上限に検証する
        },
      },
    });
  },
};

export default config;
