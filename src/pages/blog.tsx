import React from "react";
import Page from "../components/Page";
import {HeroSplashProps} from "../components/HeroSplash";

const Blog = () => {
  let splash: HeroSplashProps = {
    image: "",
    label: "",
    minHeight: "40vh"
  };

  return (
    <Page title="Blog" splashTitle="Blog" splash={splash}>
      <div>Blog</div>
    </Page>
  )
}

export default Blog;