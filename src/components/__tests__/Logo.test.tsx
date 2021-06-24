import React from "react";
import {render} from "@testing-library/react";
import Logo from "../Logo";

describe("Logo", () => {
  test("Should render without error", () => {
    const text = "logo-test"
    const testId = "logo";
    const {asFragment, getByTestId} = render(<Logo text={text} data-testid={testId} />);
    expect(getByTestId(testId)).toBeTruthy();
    expect(asFragment).toMatchSnapshot();
  });
});