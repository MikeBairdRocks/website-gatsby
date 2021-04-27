import React from "react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";

export type HeroSplashProps = {
  minHeight?: string
  image: IGatsbyImageData
  label: string
  opacity?: "opacity-0" | "opacity-25" | "opacity-50" | "opacity-75"
};

const HeroSplash: React.FunctionComponent<HeroSplashProps> = (props) => {
  const minHeight = props.minHeight ?? "75vh";
  const opacity = props.opacity ?? "opacity-75";

  return (
    <div className="relative pt-32 pb-16 flex content-center items-center justify-center" style={{minHeight}}>
      <div className="absolute top-0 w-full h-full">
        <GatsbyImage className="w-full h-full object-cover"
                     image={props.image}
                     loading="eager"
                     objectFit="cover"
                     alt={props.label} />
        <span className={`absolute inset-0 w-full h-full ${opacity} bg-black`}></span>
      </div>
      {/*<HeroImage image={props.image} opacity={props.opacity} label={props.label} />*/}
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSplash;