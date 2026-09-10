"use client";

import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp } from "@/lib/motion";

type Props = {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, title, children, className }: Props) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceMotion = mounted && prefersReduced === true;

  return (
    <motion.section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={`section ${className ?? ""}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <Container>
        {title ? (
          <h2 id={`${id}-heading`} className="sectionHeading">
            {title}
          </h2>
        ) : null}
        {children}
      </Container>
    </motion.section>
  );
}
