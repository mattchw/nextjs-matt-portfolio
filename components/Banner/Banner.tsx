"use client";

import { useEffect, useState } from "react";
import { Text, useComputedColorScheme } from "@mantine/core";
import Image from "next/image";
import { ParallaxBanner, type BannerLayer } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";
import { useReducedMotion } from "framer-motion";
import styles from "./Banner.module.css";

export default function Banner() {
  const colorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = mounted && prefersReduced === true;
  const dark = !mounted || colorScheme === "dark";

  const background: BannerLayer = {
    translateY: reduced ? [0, 0] : [5, 40],
    opacity: [0.92, 0.65],
    scale: reduced ? [1, 1] : [1.12, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={dark ? "/header-background.webp" : "/header-background-white.webp"}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.layerImage}
      />
    ),
  };

  const headline: BannerLayer = {
    translateY: [0, 0],
    scale: reduced ? [1, 1] : [1, 1.18, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className={styles.content}>
        {reduced ? (
          <h1 className={styles.headline}>Hi, I&apos;m Matt Wong</h1>
        ) : (
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
            className={styles.headline}
          />
        )}
        <Text className={styles.subheadline}>
          I code and explore new technologies, and I love what I do.
        </Text>
      </div>
    ),
  };

  const foreground: BannerLayer = {
    // A negative start would translate the layer past the bottom padding
    // react-scroll-parallax reserves, exposing the sky layer behind it.
    translateY: reduced ? [0, 0] : [0, 18],
    scale: reduced ? [1, 1] : [1.03, 1.11, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <Image
        src={dark ? "/banner-foreground.webp" : "/banner-foreground-white.webp"}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.layerImage}
      />
    ),
  };

  const overlay: BannerLayer = {
    opacity: [0, 0.92],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div
        className={styles.overlay}
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--mantine-color-dark-7) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--mantine-color-body) 100%)",
        }}
      />
    ),
  };

  return (
    <div id="hero">
      <ParallaxBanner
        layers={[background, foreground, headline, overlay]}
        className={styles.hero}
      />
    </div>
  );
}
