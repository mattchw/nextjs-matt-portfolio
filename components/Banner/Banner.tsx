import {
  Center,
  Text,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import styles from "./Banner.module.css";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import { ParallaxBanner } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";

const Banner: React.FC<{}> = () => {
  const { colorScheme } = useMantineColorScheme();
  const useStyles = createStyles((theme) => ({
    headlineFont: {
      fontWeight: 300,
      fontSize: 60,
      lineHeight: 0.5,

      [theme.fn.smallerThan("md")]: {
        fontSize: 50,
      },

      [theme.fn.smallerThan("sm")]: {
        fontSize: 40,
      },

      [theme.fn.smallerThan("xs")]: {
        fontSize: 30,
      },
    },
    subHeadlineFont: {
      fontSize: 16,
      [theme.fn.smallerThan("md")]: {
        fontSize: 14,
      },

      [theme.fn.smallerThan("sm")]: {
        fontSize: 12,
      },

      [theme.fn.smallerThan("xs")]: {
        fontSize: 8,
      },
    },
  }));

  const { classes } = useStyles();

  const background: BannerLayer = {
    image:
      colorScheme === "dark"
        ? "header-background.png"
        : "header-background-white.png",
    translateY: [5, 50],
    opacity: [0.9, 0.6],
    scale: [1.15, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline: BannerLayer = {
    translateY: [0, 0],
    scale: [1, 1.5, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <Center className={styles.content}>
        <TypeAnimation
          sequence={[
            "Hi, I'm Matt Wong",
            4000,
            "Hi, I'm a Software Engineer",
            4000,
          ]}
          wrapper="h1"
          speed={30}
          repeat={Infinity}
          className={classes.headlineFont}
        />
        <Text className={classes.subHeadlineFont}>
          I code and explore new technologies, and I love what I do.
        </Text>
      </Center>
    ),
  };

  const foreground: BannerLayer = {
    image:
      colorScheme === "dark"
        ? "/banner-foreground.png"
        : "/banner-foreground-white.png",
    translateY: [-10, 15],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const overlay: BannerLayer = {
    opacity: [0, 0.9],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
        }}
      />
    ),
  };
  return (
    <ParallaxBanner
      layers={[background, foreground, headline, overlay]}
      style={{
        height: "150vh",
        width: "100%",
      }}
    />
  );
};

export default Banner;
