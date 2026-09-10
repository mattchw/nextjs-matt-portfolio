"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ParallaxProvider } from "react-scroll-parallax";
import { theme } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <ParallaxProvider>{children}</ParallaxProvider>
    </MantineProvider>
  );
}
