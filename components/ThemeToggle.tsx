"use client";

import { useEffect, useState } from "react";
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = !mounted || computed === "dark";

  return (
    <ActionIcon
      className="themeButton"
      variant="light"
      color={dark ? "yellow" : "blue"}
      size="xl"
      radius="xl"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setColorScheme(dark ? "light" : "dark")}
    >
      {dark ? <IconSun size={22} /> : <IconMoonStars size={22} />}
    </ActionIcon>
  );
}
