import React from "react";
import {render} from "@testing-library/react";
import {useStaticQuery} from "gatsby";
import Footer from "../Footer";
import {FooterQuery} from "../../../types/graphql-types";

describe("Footer", () => {
  beforeAll(() => {
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

    const mockedUseStaticQuery = useStaticQuery as jest.Mock;
    mockedUseStaticQuery.mockReturnValue(data);
  });

  test("Should render without error", () => {
    const {asFragment, getByTestId} = render(<Footer data-testid="footer"/>);
    expect(getByTestId("footer")).toBeTruthy();
    expect(asFragment).toMatchSnapshot();
  });

  test("Should show Social Icon", () => {
    const {getByLabelText} = render(<Footer />);
    const socialIconElement = getByLabelText(/Twitter/);
    expect(socialIconElement).toBeInTheDocument();
  });

  test("Should have copyright", () => {
    const {getByText} = render(<Footer />);
    const copyrightElement = getByText(/Copyright/);
    expect(copyrightElement).toBeInTheDocument();
  });
});