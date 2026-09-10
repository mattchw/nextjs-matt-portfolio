import { createTheme, MantineColorsTuple } from "@mantine/core";

const brand: MantineColorsTuple = [
  "#e6f6fc",
  "#c8ebf7",
  "#8fd4ee",
  "#54bce4",
  "#2aa8d6",
  "#168ac0",
  "#025f89",
  "#024a6b",
  "#02354d",
  "#011f2e",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand },
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), ui-monospace, monospace",
  headings: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontWeight: "600",
  },
  defaultRadius: "md",
  cursorType: "pointer",
  components: {
    Container: {
      defaultProps: {
        size: "lg",
      },
    },
  },
});
