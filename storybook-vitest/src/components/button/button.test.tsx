import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  test("Render Button Component", () => {
    render(<Button label="Button" />);
    screen.debug();

    test("Button Component", () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent("Button");
    });
  });
});
