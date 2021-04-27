import Layout from "./Layout";
import Meta from "./Meta";
import React from "react";
import HeroSplash, {HeroSplashProps} from "./HeroSplash";

interface PageProps {
  title: string;
  splash: HeroSplashProps;
  splashTitle?: string;
  splashSecondary?: string;
}

const Page: React.FunctionComponent<PageProps> = (props) => {
  const splashTitle = props.splashTitle ?? props.title;
  const Secondary = () => {
    if(!props.splashSecondary)
      return null;

    return <p className="mt-4 text-lg text-gray-300">{props.splashSecondary}</p>;
  };

  return (
    <Layout navbarTransparent={true}>
      <Meta title={props.title} />

      <HeroSplash {...props.splash} opacity="opacity-50">
        <h1 className="text-white font-semibold text-5xl">{splashTitle}</h1>
        <Secondary />
      </HeroSplash>

      <div className="pb-20">
        {props.children}
      </div>
    </Layout>
  );
};

export default Page;