import React from "react";
import { render } from "@testing-library/react";
import Footer, {PureFooter} from "../Footer";
import {FooterQuery} from "../../../types/graphql-types";

describe("Footer", () => {
  it("Should render without error", () => {
    const data: FooterQuery = {
      site: {
        siteMetadata: {
          title: "Test",
          description: "Testing",
          social: [
            {url: "https://localhost", type: "Twitter"}
          ]
        }
      }
    };
    const { asFragment, getByText, getByTestId } = render(<PureFooter data={data} data-testid="footer" />);
    expect(getByTestId("footer")).toBeTruthy();
    expect(getByText(/Copyright/)).toBeTruthy();
    expect(asFragment).toMatchSnapshot();
  });
});